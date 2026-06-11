/**
 * Kerala Venue Seed Data
 * 15 sample venues across major districts of Kerala
 * Run: node backend/seeders/venueSeeder.js
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Venue = require("../models/Venue");

dotenv.config();

const venues = [
  // ── Thiruvananthapuram ────────────────────────────────────────────────────
  {
    name: "Leela Convention Centre",
    description:
      "A stunning beachfront convention hall with panoramic views of the Arabian Sea, perfect for grand weddings and corporate events.",
    category: "convention_center",
    district: "Thiruvananthapuram",
    town: "Kovalam",
    address: "Beach Road,The Leela, Kovalam, Thiruvananthapuram, Kerala 695527",
    location: { type: "Point", coordinates: [8.39447481228978, 76.9733272939781] },
    capacity: { min: 100, max: 800 },
    pricing: { basePrice: 75000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Sea View", "Parking", "Catering", "Stage", "Projector", "WiFi", "Dressing Room", "Generator"],
    images: [
      "https://www.theleela.com/the-leela-kovalam-a-raviz-hotel",
      "https://www.google.com/imgres?q=leela%20convention%20centre%20kovalam&imgurl=https%3A%2F%2Fwww.theleela.com%2Fprod%2Fcontent%2Fassets%2Faio-banner%2Fdekstop%2FCelebrations_1920x950_7.webp&imgrefurl=https%3A%2F%2Fwww.theleela.com%2Fthe-leela-kovalam-a-raviz-hotel%2Fcelebrations&docid=yCoDh1u8Ce2Y_M&tbnid=EHR_uEd8XAl1uM&vet=12ahUKEwjFlo7ujvWUAxUrxzgGHe8RGEMQnPAOegQIIhAB..i&w=1920&h=950&hcb=2&ved=2ahUKEwjFlo7ujvWUAxUrxzgGHe8RGEMQnPAOegQIIhAB",
    ],
    contactInfo: { phone: "18001031444", email: "NIL" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },
  {
    name: "Bishop Pereira Hall",
    description:
      "A lush green property with an elegant indoor banquet hall and an open-air lawn, ideal for all types of celebrations.",
    category: "banquet_hall",
    district: "Thiruvananthapuram",
    town: "palayam",
    address: "Road, near Police Camp, University of Kerala Senate House Campus, Nandavanam, Palayam, Thiruvananthapuram, Kerala 695033",
    location: { type: "Point", coordinates: [8.510279768495343, 76.95090176688079] },
    capacity: { min: 50, max: 500 },
    pricing: { basePrice: 40000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Catering", "Stage", "Lawn", "Valet", "Generator", "Sound System"],
    images: [
      "https://www.google.com/imgres?q=bishop%20pereira%20hall%20palayam&imgurl=https%3A%2F%2Fimage.wedmegood.com%2Fresized%2F800X%2Fuploads%2Fmember%2F700485%2F1568098742_Screenshot_from_2019_09_10_12_08_48.png&imgrefurl=https%3A%2F%2Fwww.wedmegood.com%2Fwedding-venues%2FBishop-Pereira-Hall-700485%3Fsrsltid%3DAfmBOoqYcSgASDP9HgI2o4gdqJCHAQYTixz2zfySwz_Kj602ps8yBwWd&docid=axuZBVNnWo_69M&tbnid=ESFNbqcYCVzzCM&vet=12ahUKEwiPutHYkPWUAxUTXGwGHflLGX8QnPAOegQIHBAB..i&w=800&h=482&hcb=2&ved=2ahUKEwiPutHYkPWUAxUTXGwGHflLGX8QnPAOegQIHBAB",
      "https://image.wedmegood.com/resized/450X/uploads/member/700485/1568098747_Screenshot_from_2019_09_10_11_37_39.png",
    ],
    contactInfo: { phone: "07511107755", email: "info@bishopperira.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Ernakulam (Kochi) ─────────────────────────────────────────────────────
  {
    name: "Le Meridien Grand Ballroom",
    description:
      "Kochi's premier luxury ballroom, equipped with state-of-the-art AV systems and world-class catering. A favourite for elite weddings and conferences.",
    category: "hotel_ballroom",
    district: "Ernakulam",
    town: "Kochi",
    address: "Maradu, Kochi, Ernakulam, Kerala 682304",
    location: { type: "Point", coordinates: [9.93401244364914, 76.31649075092575] },
    capacity: { min: 200, max: 1500 },
    pricing: { basePrice: 150000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Valet", "Catering", "Stage", "Projector", "WiFi", "Dressing Room", "Generator", "Bridal Suite"],
    images: [
      "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
      "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800",
    ],
    contactInfo: { phone: "+91 484 2885000", email: "events@lemeridien-kochi.com", website: "https://www.marriott.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },
  {
    name: "Anugraha Auditorium, St. Francis Xavier Parish Annexe",
    description:
      "A heritage auditorium in the heart of Kaloor with excellent acoustics, ideal for cultural programmes, conferences, and seminars.",
    category: "auditorium",
    district: "Ernakulam",
    town: "Kochi",
    address: "St Francis Xaviers Church Rd, Kathrikadavu, Kaloor, Ernakulam, Kerala 682017",
    location: { type: "Point", coordinates: [9.986079072694052, 76.29364571528832] },
    capacity: { min: 100, max: 600 },
    pricing: { basePrice: 25000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Stage", "Projector", "Sound System", "Green Room", "WiFi"],
    images: [
      "https://www.facebook.com/photo/?fbid=905861296255690&set=a.319830086828358&__cft__[0]=AZZz07ovCKJfrFRc2QsApaTLgWxng5IOlGq_rCT6JK3-Ahf1lWzCGiSi52CPcoVyh_SNN5Oe942kJshVMKJb2WiABey9qwbUmTHRMCabjgJgtihI8s6rrc15TogbtbR5pxojvUumyrYExHnG2ZaKE9p6uZToPy7XLWkTjwMyKwGkwA&__tn__=EH-R",
      "https://weddingz.in/kochi/anugraha-auditorium-kaloor/",
    ],
    contactInfo: { phone: "+91 484 2353535", email: "booking@ernakulamtownhall.in" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Thrissur ──────────────────────────────────────────────────────────────
  {
    name: "Wedding Village",
    description:
      "A sprawling outdoor wedding garden adjacent to a heritage palace, featuring manicured lawns and a traditional mandapam.",
    category: "outdoor",
    district: "Thrissur",
    town: "Thrissur",
    address: "Civil Lines Rd, Thrissur, Kerala 680003",
    location: { type: "Point", coordinates: [10.539908430754744, 76.18433663481636] },
    capacity: { min: 200, max: 2000 },
    pricing: { basePrice: 60000, currency: "INR", pricingModel: "per_event" },
    amenities: ["Open Lawn", "Mandapam", "Parking", "Catering", "Generator", "Lighting", "Valet", "Restrooms"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfZtyNM0GxPtQJ44YyZbaDGiC04IsNTcDIxw&s",
      "https://image.wedmegood.com/resized/720X/uploads/member/25870705/1753862417_Screenshot_39.jpg",
    ],
    contactInfo: { phone: "08589063888", email: "NIL" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },
  {
    name: "Thiruvambady Convention Centre",
    description:
      "A modern multi-purpose convention centre in Thrissur with modular halls for events ranging from intimate gatherings to large conferences.",
    category: "convention_center",
    district: "Thrissur",
    town: "Thekkinkadu",
    address: "Marar Road Area, Thekkinkadu Maidan, Thrissur, Kerala 680001",
    location: { type: "Point", coordinates: [10.532744854069263, 76.20461766606248] },
    capacity: { min: 50, max: 1000 },
    pricing: { basePrice: 50000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Catering", "Stage", "Projector", "WiFi", "Generator", "Sound System", "Dressing Room"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSdwVb41iUsYW7TKuZchhg_Ijp5NcnF4y0pg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRm304Q_N48r73A2Ic2xa11yDtrCdxW4S6nEw&s",
    ],
    contactInfo: { phone: "04872972442", email: "NIL" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Kozhikode (Calicut) ───────────────────────────────────────────────────
  {
    name: "Sree Narayana Centenary Hall",
    description:
      "A grand wedding hall blending Malabar heritage architecture with modern amenities, offering breathtaking interiors for memorable celebrations.",
    category: "wedding_hall",
    district: "Kozhikode",
    town: "Kozhikode",
    address: "380, SK Temple Rd, Tazhekkod, Kozhikode, Kerala 673001",
    location: { type: "Point", coordinates: [11.261388171099407, 75.78341476953202] },
    capacity: { min: 100, max: 1200 },
    pricing: { basePrice: 65000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Catering", "Stage", "Bridal Suite", "Generator", "Sound System", "Dressing Room", "Valet"],
    images: [
      "https://images.unsplash.com/photo-1519741347686-c1e331f51df3?w=800",
      "https://images.unsplash.com/photo-1568695271936-bd98f9b3b0c5?w=800",
    ],
    contactInfo: { phone: "04952722681", email: "events@calicutheritagehall.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },
  {
    name: "Majestic Auditorium",
    description:
      "Turn your special moments into grand celebrations at our elegant auditorium.",
    category: "auditorium",
    district: "Kozhikode",
    town: "Palayam",
    address: "Chinthavalappu Flats, Palayam, Kozhikode, Kerala 673002",
    location: { type: "Point", coordinates: [11.250733501237159, 75.7881998202383] },
    capacity: { min: 30, max: 150 },
    pricing: { basePrice: 20000, currency: "INR", pricingModel: "per_event" },
    amenities: ["Open Air", "Sea View", "Bar Counter", "Sound System", "WiFi", "Catering", "Lighting"],
    images: [
      "https://hallsincalicut.com/images/gallery-majestic-auditorium-halls/majestic/3.jpg",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDCSXtm7JmJUTQ26hlKkaySMqhlt8oo3v-sA&s",
    ],
    contactInfo: { phone: "09497392200", email: "majestic@beachlounge.in" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Kollam ────────────────────────────────────────────────────────────────
  {
    name: "Samiira on Ashtamudi Lake",
    description:
      "A serene backwater resort banquet hall perched beside Ashtamudi Lake, renowned for its Kerala-style cuisine and tranquil ambiance.",
    category: "resort",
    district: "Kollam",
    town: "Kollam",
    address: "Sarayu Nagar, Asramam, Kollam, Kerala 691002",
    location: { type: "Point", coordinates: [8.900695693730787, 76.5932642932539] },
    capacity: { min: 50, max: 400 },
    pricing: { basePrice: 55000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Lake View", "Parking", "Catering", "Stage", "Boat Rides", "WiFi", "Generator"],
    images: [
      "https://www.instagram.com/p/DNR5tBTNdC6/",
      "https://www.instagram.com/samiiraquilon/p/DOsIDbmj7Dj/",
    ],
    contactInfo: { phone: "04742950507", email: "stay@ashtamudilakeresort.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Alappuzha (Alleppey) ──────────────────────────────────────────────────
  {
    name: "Punnamada Resort",
    description:
      "An enchanting houseboat-style pavilion on the backwaters of Alappuzha, offering a one-of-a-kind floating venue experience.",
    category: "resort",
    district: "Alappuzha",
    town: "Alleppey",
    address: "Punnamada, Kottankulangara, Alappuzha, Kerala 688006",
    location: { type: "Point", coordinates: [79.526554569759163, 76.35672062208984] },
    capacity: { min: 20, max: 200 },
    pricing: { basePrice: 35000, currency: "INR", pricingModel: "per_event" },
    amenities: ["Backwater View", "Catering", "Sound System", "Lighting", "Boat Access", "Photography Support"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4pvs5YLF6PC5b5zzfE2WB21qy6XiSeCNVmQ&s",
      "https://www.keralatourism.org/images/service-providers/photos/property-2670-profile-8269-20180726062519.jpg",
    ],
    contactInfo: { phone: "09446433692", email: "bookings@alleppey.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Kottayam ──────────────────────────────────────────────────────────────
  {
    name: "KTDC Waterscapes Auditorium",
    description:
      "A lakeside banquet hall set in the heart of Kumarakom bird sanctuary area, combining luxury and nature seamlessly.",
    category: "banquet_hall",
    district: "Kottayam",
    town: "Kumarakom",
    address: "Backwater Resort, KTDC, North, Kumarakom, Kerala 686563",
    location: { type: "Point", coordinates: [9.627408143586248, 76.42448289325388] },
    capacity: { min: 50, max: 600 },
    pricing: { basePrice: 80000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Lake View", "Parking", "Valet", "Catering", "Stage", "WiFi", "Dressing Room", "Generator", "Spa Access"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiNTDiShSZo5IhnWmXbf3AZUP2AJXWtRQmug&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv8Ygj5cExcmWprCIZNGxYtgKBIoyXGGd0Gg&s",
    ],
    contactInfo: { phone: "04812525861", email: "events@kumarakomluxury.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Kannur ────────────────────────────────────────────────────────────────
  {
    name: "Exora Conventions",
    description:
      "A large-scale community convention centre in Kannur, well-suited for summits, cultural programmes, and exhibitions.",
    category: "convention_center",
    district: "Kannur",
    town: "Kannur",
    address: "Near Govt. Talap Mixed UP School, Talap, Kannur, Kerala 670002",
    location: { type: "Point", coordinates: [11.900378777718332, 75.3679914755582] },
    capacity: { min: 300, max: 2500 },
    pricing: { basePrice: 55000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Parking", "Stage", "Projector", "Sound System", "WiFi", "Generator", "Canteen"],
    images: [
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE5_QpT5hoOM8F7EOEAz5kvX4NgNfY6NOKvg&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPOH1CFpS9tJb-2ez1lIrBHUKOP5PKVnt7Cg&s",
    ],
    contactInfo: { phone: "09895024644", email: "convention@kannur.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },

  // ── Idukki ────────────────────────────────────────────────────────────────
  {
    name: "Munnar Hills Conference Resort",
    description:
      "A premium hill-station conference resort in Munnar with cool climate, panoramic tea-estate views, and modern meeting rooms.",
    category: "resort",
    district: "Idukki",
    town: "Munnar",
    address: "P.B.No 3, Thattathi Muku Chithirapuram P. O, Kerala 685565",
    location: { type: "Point", coordinates: [10.032613683677239, 77.0373316932539] },
    capacity: { min: 20, max: 300 },
    pricing: { basePrice: 90000, currency: "INR", pricingModel: "per_day" },
    amenities: ["AC", "Mountain View", "Parking", "Catering", "Projector", "WiFi", "Generator", "Bonfire Area", "Trekking Support"],
    images: [
      "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=800",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
    ],
    contactInfo: { phone: "08714814775", email: "bookings@munnarresort.com", website: "http://www.munnarteahills.com" },
    status: "approved",
    isActive: true,
    isSeed: true,
  },
];

// ── Seeder runner ──────────────────────────────────────────────────────────
async function seedVenues() {
  const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bookmyvenue";

  console.log("🔌  Connecting to MongoDB …");
  await mongoose.connect(uri);
  console.log("✅  Connected");

  // Delete ONLY seed venues — real owner-submitted venues are untouched
  console.log("🗑   Removing existing seed venues (isSeed: true) …");
  const deleted = await Venue.deleteMany({ isSeed: true });
  console.log(`    Removed ${deleted.deletedCount} seed venue(s)`);

  console.log(`🌱  Inserting ${venues.length} Kerala seed venues …`);
  const inserted = await Venue.insertMany(venues);
  console.log(`✅  Inserted ${inserted.length} venues successfully`);

  await mongoose.disconnect();
  console.log("🔌  Disconnected. Seeding complete!");
}

seedVenues().catch((err) => {
  console.error("❌  Seeding failed:", err);
  process.exit(1);
});
