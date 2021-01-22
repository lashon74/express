const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost:27017/shopApp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("CONNECTION OPEN");
  })
  .catch((err) => {
    console.log("OH NO ERROR!!");
    console.log(err);
  });

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  onSale: {
    type: Boolean,
    default: false,
  },
  categories: [String],
  qty: {
    online: {
      type: Number,
      default: 0,
    },
    inStore: {
      type: Number,
      default: 0,
    },
    size: {
      type: String,
      enum: ["S", "M", "L"],
    },
  },
});

productSchema.methods.greet = function () {
  console.log("Hello");
};

productSchema.methods.toggleOnSale = function () {
  this.onSale = !this.onSale;
  return this.save();
};

productSchema.methods.addCategory = function (newCat) {
  this.categories.push(newCat);
  return this.save();
};

productSchema.statics.fireSale = function (newCat) {
  return this.updateMany({}, {onSale: true, price: 0})
};

const Product = mongoose.model("Product", productSchema);

const findProduct = async () => {
  const foundProduct = await Product.findOne({ name: "BikeHelmet" });
  await foundProduct.toggleOnSale();
  await foundProduct.addCategory('Outdoors');
};

// const bike = new Product({
//   name: "Tire Pump",
//   price: 19.50,
//   categories: ["Cycling"],
// });
// bike
//   .save()
//   .then((data) => {
//     console.log("It worked");
//     console.log(data);
//   })
//   .catch((err) => {
//     console.log("Oh no it failed!!");
//     console.log(err);
//   });
Product.findOneAndUpdate(
  { name: "Tire Pump" },
  { price: 10.5 },
  { new: true, runValidators: true }
)
  .then((data) => {
    console.log("It worked");
    console.log(data);
  })
  .catch((err) => {
    console.log("Oh no it failed!!");
    console.log(err);
  });
