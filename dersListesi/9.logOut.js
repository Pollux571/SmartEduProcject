// ! 1
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

// ! 2
// ! html sayfasini duzeltik navigation.ejs
<li>
  <a class="hover-btn-new log mr-2" href="/users/logout">
    <span>
      <i class="fa fa-sign-out" aria-hidden="true"></i>
    </span>
  </a>
</li>;
// sonra route yazdik
router.route("/logout").get(authController.logoutUser);

// ! 3 npm i connect-mongo@4.4.1 indirdik uygulamayi tekrar baslatigimizda bizi log out yapmasin diye bunu yaptik ve database ede session gonderdik mongodbdeki
// ve artik oturumum kapanmiyor uygulamayi tekrar kapatip acitigimda

const MongoStore = require("connect-mongo");
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/smartedu-db",
    }),
  })
);
