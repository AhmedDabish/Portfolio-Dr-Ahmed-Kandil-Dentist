namespace PortfolioAdmin.API.Services;

public interface IEmailService
{
    Task SendContactMessageAsync(string name, string fromEmail, string? phone, string message);
}

public class EmailService : IEmailService
{
    private readonly IConfiguration _config;
    private readonly ILogger<EmailService> _logger;

    public EmailService(IConfiguration config, ILogger<EmailService> logger)
    {
        _config = config;
        _logger = logger;
    }

    public async Task SendContactMessageAsync(string name, string fromEmail, string? phone, string message)
    {
        var section = _config.GetSection("Email");
        var host = section["SmtpHost"] ?? "smtp.gmail.com";
        var port = int.Parse(section["SmtpPort"] ?? "587");
        var senderEmail = section["SenderEmail"];
        var senderPassword = section["SenderPassword"];
        var receiverEmail = section["ReceiverEmail"] ?? "a01027126356@gmail.com";

        using var client = new System.Net.Mail.SmtpClient(host, port)
        {
            Credentials = new System.Net.NetworkCredential(senderEmail, senderPassword),
            EnableSsl = true
        };

        var mail = new System.Net.Mail.MailMessage
        {
            From = new System.Net.Mail.MailAddress(senderEmail!, "رسالة تواصل من الموقع"),
            Subject = $"رسالة جديدة من {name}",
            Body =
                $"الاسم: {name}\n" +
                $"البريد الإلكتروني: {fromEmail}\n" +
                $"الهاتف: {phone ?? "غير محدد"}\n\n" +
                $"الرسالة:\n{message}",
            IsBodyHtml = false
        };
        mail.To.Add(receiverEmail);
        mail.ReplyToList.Add(new System.Net.Mail.MailAddress(fromEmail));

        try
        {
            await client.SendMailAsync(mail);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "فشل إرسال رسالة التواصل");
            throw;
        }
    }
}