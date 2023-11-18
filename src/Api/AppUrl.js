export default class AppUrl {
  // static BaseURL = "http://localhost:1337/api";
  static BaseURL = process.env.REACT_APP_BASE_URL;
  // static token =
  //   "6fdee4f616da8392980cf355ea38fbd26a3ba73294d54afb188d5799b5c0ffa4e02db54520b1b253f11887672a1a9038cc39c2ee981c4769b28a2d8c6ba1b2963bccfa8e7b10105e76b4d973e7427b7874f2826d0f400841023de8c84eb53f910134a24bc10542e3b8a3ca5d3966ba3edb63a1564f09b341a3e62d08ed80422e";
  static token = process.env.REACT_APP_TOKEN;
  // static ImageUrl = "http://localhost:1337";
  static ImageUrl = process.env.REACT_APP_IMAGE_URL;
}
