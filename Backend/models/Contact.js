class Contact {
    constructor(name, email, description) {
      this.name = name;
      this.email = email;
      this.description = description;
      this.timestamp = new Date();
    }
  }
  
  module.exports = Contact;