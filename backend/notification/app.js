import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect } from "amqplib";
import nodemailer from "nodemailer";
import axios from "axios";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

const port = process.env.PORT || 3003;
// const connectionString = process.env.MONGODB || "mongodb://localhost:27017/";
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "medblbbstudies@gmail.com",
    pass: "hqnb cfdj trol uscr ",
  },
});

app.listen(port, () => console.log("/Notifications - server connected"));
// mongoose
//   .connect(connectionString + "Notifications")
//   .then(() => console.log("database connected"));

const getEmails = async () => {
  const response = await axios.get("http://localhost:3001/api/emails");
  return response.data?.data;
};

const connection = await connect("amqp://localhost:5672");

const channel = await connection.createChannel();

const queueBooks = "bookAdded";
const queueBooksDeleted = "deletedBook";
const queueLoans = "loanTaken";
const queueLoansReturned = "loanReturned";
const queueClients = "addedClient";
const queueClientUpdated = "updatedClient";
const queueClientDeleted = "deletedClient";

//Add book
await channel.assertQueue(queueBooks, {
  durable: true,
});

channel.consume(queueBooks, async (message) => {
  try {
    let bookData = JSON.parse(message.content.toString());
    let bookTitle = bookData.titre;
    let bookDescription = bookData.description;
    let bookAuthor = bookData.auteur;

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "New book added: " + bookTitle,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A new book has been added:</h2>
              <p><strong>Title:</strong> ${bookTitle}</p>
              <p><strong>Description:</strong> ${bookDescription}</p>
              <p><strong>Author:</strong> ${bookAuthor}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.", emails);
    console.log("New book added:", bookTitle);
    channel.ack(message);
  } catch (error) {
    console.log("Error:", error);
    // Handle errors as needed
  }
});

//book deleted
await channel.assertQueue(queueBooksDeleted, {
  durable: true,
});

channel.consume(queueBooksDeleted, async (message) => {
  try {
    let bookData = JSON.parse(message.content.toString());
    let bookTitle = bookData.titre;
    let bookDescription = bookData.description;
    let bookAuthor = bookData.auteur;

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "Book deleted: " + bookTitle,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A book has been deleted:</h2>
              <p><strong>Title:</strong> ${bookTitle}</p>
              <p><strong>Description:</strong> ${bookDescription}</p>
              <p><strong>Author:</strong> ${bookAuthor}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.");
    console.log("Book deleted:", bookTitle);
    channel.ack(message);
  } catch (error) {
    console.log("Error:", error);
    // Handle errors as needed
  }
});

//loan added
await channel.assertQueue(queueLoans, {
  durable: true,
});

channel.consume(queueLoans, async (message) => {
  try {
    let loanData = JSON.parse(message.content.toString());
    let client = loanData.client;
    let book = loanData.book;
    let dateRetour = loanData.dateRetour || "Not returned yet";

    // Fetch client and book data asynchronously
    const [clientRecord, bookRecord] = await Promise.all([
      axios.get(`http://127.0.0.1:3001/api/${client}`),
      axios.get(`http://127.0.0.1:3000/api/${book}`),
    ]);

    const dataClient = clientRecord.data;
    const dataBook = bookRecord.data;

    if (!dataClient.data || !dataBook.data) {
      throw new Error("Client or book not found");
    }

    const { data: clientInfo } = dataClient;
    const { data: bookInfo } = dataBook;

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "Loan taken: " + bookInfo?.titre,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A new loan has been taken:</h2>
              <p><strong>Title:</strong> ${bookInfo?.titre}</p>
              <p><strong>Description:</strong> ${bookInfo?.description}</p>
              <p><strong>Author:</strong> ${bookInfo?.auteur}</p>
              <p><strong>Client:</strong> ${clientInfo?.nom}</p>
              <p><strong>Date emprunt:</strong> ${dateEmprunt}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.");
    channel.ack(message);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
});

//loan returned
await channel.assertQueue(queueLoansReturned, {
  durable: true,
});

channel.consume(queueLoansReturned, async (message) => {
  let loanData = JSON.parse(message.content.toString());
  let client = loanData.client;
  let book = loanData.book;

  let dateRetour = loanData.dateRetour;
  let dateEmprunt = loanData.dateEmprunt;
  let clientRecord = await axios.get("http://127.0.0.1:3001/api/" + client);
  let dataClient = clientRecord.data;
  let bookRecord = await axios.get("http://127.0.0.1:3000/api/" + book);
  let dataBook = bookRecord.data;
  let { data: clientInfo } = dataClient;
  let { data: bookInfo } = dataBook;
  if (!dataClient.data || !dataBook.data) {
    console.log("Client or book not found");
  }
  console.log("loan returned:", client, book, dateRetour, dateEmprunt);
  var mailOptions = {
    from: "medblbbstudies@gmail.com",
    to: "medblbbstudies@gmail.com",
    subject: "loan returned: " + book,
    html: `
      <html>
        <body>
          <h2 style="color: #007bff;">A loan has been returned:</h2>
          <p><strong>Title:</strong> ${bookInfo?.titre}</p>
          <p><strong>Client:</strong> ${clientInfo?.nom} ${clientInfo?.prénom}</p>
          <p><strong>Date emprunt:</strong> ${dateEmprunt}</p>
          <p><strong>Date retour:</strong> ${dateRetour}</p>
        </body>
      </html>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log("Erreur : " + error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  channel.ack(message);
});
//Add client

await channel.assertQueue(queueClients, {
  durable: true,
});

channel.consume(queueClients, async (message) => {
  try {
    let clientData = JSON.parse(message.content.toString());
    let clientName = clientData.nom;
    let clientPrenom = clientData.prénom;
    let clientEmail = clientData.email;
    if (!clientName || !clientEmail) {
      throw new Error("Client name or email not found");
    }

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "New client added: " + clientName,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A new client has been added:</h2>
              <p><strong>Name:</strong> ${clientName}</p>
              <p><strong>Prenom:</strong> ${clientPrenom}</p>
              <p><strong>Email:</strong> ${clientEmail}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.");
    console.log("New client added:", clientName, clientEmail);
    channel.ack(message);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
});

//Update client
await channel.assertQueue(queueClientUpdated, {
  durable: true,
});
channel.consume(queueClientUpdated, async (message) => {
  try {
    let clientData = JSON.parse(message.content.toString());
    let clientName = clientData.nom;
    let clientPrenom = clientData.prénom;
    let clientEmail = clientData.email;
    if (!clientName || !clientEmail) {
      throw new Error("Client name or email not found");
    }

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "Client updated: " + clientName,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A client has been updated:</h2>
              <p><strong>Name:</strong> ${clientName}</p>
              <p><strong>Prenom:</strong> ${clientPrenom}</p>
              <p><strong>Email:</strong> ${clientEmail}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.");
    console.log("Client updated:", clientName, clientEmail);
    channel.ack(message);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
});
//Delete client
await channel.assertQueue(queueClientDeleted, {
  durable: true,
});

channel.consume(queueClientDeleted, async (message) => {
  try {
    let clientData = JSON.parse(message.content.toString());
    let clientName = clientData.nom;
    let clientPrenom = clientData.prénom;
    let clientEmail = clientData.email;
    if (!clientName || !clientEmail) {
      throw new Error("Client name or email not found");
    }

    // Fetch emails asynchronously
    const emails = await getEmails();

    const mailPromises = emails.map((email) => {
      var mailOptions = {
        from: "medblbbstudies@gmail.com",
        to: email,
        subject: "Client deleted: " + clientName,
        html: `
          <html>
            <body>
              <h2 style="color: #007bff;">A client has been deleted:</h2>
              <p><strong>Name:</strong> ${clientName}</p>
              <p><strong>Prenom:</strong> ${clientPrenom}</p>
              <p><strong>Email:</strong> ${clientEmail}</p>
            </body>
          </html>`,
      };

      return transporter.sendMail(mailOptions);
    });

    // Execute all email sending promises concurrently
    await Promise.all(mailPromises);

    console.log("Emails sent to all recipients.");
    console.log("Client deleted:", clientName, clientEmail);
    channel.ack(message);
  } catch (error) {
    console.error("Error:", error);
    // Handle errors as needed
  }
});
