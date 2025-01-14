import mongoose, { Schema, model, models } from "mongoose";

const siteSchema = new Schema({
  name: { type: String, required: true },  
  location: { type: String, required: true, unique: true },
  securityCount: { type: Number, required: true },
  address: { type: String, required: true },
});

// Use existing model or create a new one
const Site = models.Site || model("Site", siteSchema);

export default Site;
