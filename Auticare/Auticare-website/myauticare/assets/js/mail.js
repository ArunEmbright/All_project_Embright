function sendMail() {
  console.log("on!")
  var payload = {
    name: document.getElementById("name").value,
    mail: document.getElementById("email").value,
    phone: document.getElementById("number").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };
  emailjs.send("service_x7wi6cl", "template_01ovtlw", payload).then(
    function (response) {
      console.log("hai")
      alert("Mail has been sent successfully");
    },
    function (error) {
      alert("Couldn't send the mail due to some error");
    }
  );
}