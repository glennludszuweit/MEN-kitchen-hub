const mongoose = require("mongoose");
var mongooseTypePhone = require("mongoose-type-phone");

const subscriberSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  telNumber: {
    type: mongoose.SchemaTypes.Phone,
    required: "Phone number should be set correctly",
    allowBlank: false,
    allowedNumberTypes: [
      mongooseTypePhone.PhoneNumberType.MOBILE,
      mongooseTypePhone.PhoneNumberType.FIXED_LINE_OR_MOBILE
    ],
    // phoneNumberFormat: mongooseTypePhone.PhoneNumberFormat.INTERNATIONAL, // can be omitted to keep raw input
    defaultRegion: "DE",
    parseOnGet: false
  }
});

subscriberSchema.methods.getInfo = function() {
  return `Name: ${this.name} Email: ${this.email} Tel Number: ${this.telNumber}`;
};

subscriberSchema.methods.findLocalSubscribers = function() {
  return this.model("Subscriber")
    .find({ name: this.name })
    .exec();
};

module.exports = mongoose.model("Subscriber", subscriberSchema);
