import moment from "moment";
moment.locale("fr");
class Product {
  constructor(row) {
    this.row = row;
  }
  get _id() {
    return this.row._id;
  }
  get title() {
    return this.row.title;
  }
  get description() {
    return this.row.description;
  }
  get imageUrl() {
    return this.row.imageUrl;
  }
  get price() {
    return this.row.price;
  }
  get slug() {
    return this.row.slug;
  }
  get rating() {
    return this.row.rating;
  }
  get createdAt() {
    return moment(this.row.createdAt);
  }
  get updatedAt() {
    return this.row.updatedAt;
  }
  get excerpt() {
    return this.description.length > 100
      ? this.description.substring(0, 100) + "..."
      : this.description;
  }
}
export default Product;
