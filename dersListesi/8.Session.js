// ! 1 npm i express-session

// ? app jsde bunlari ypaiyoruz ilk once
const session = require("express-session");
app.use(
  session({
    secret: "my_keyboard_cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // 1.17 den versiyondan sonra kullanmaya gerek yok kaldirildi
  })
);

// ! 2 sonra log usere  req.session.userID = user._id sunu ekliyoruz kontrol icin
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            // USER SESSION
            req.session.userID = user._id; // once surayi olusturduk
            res.status(200).redirect("/");
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};

// ! 3 sonra global degisken olusturduk

// ? global degisken olusturmak
global.userIN = null; // global burda bir nesne userIN burda degisken null false esittir

// ! 4 routese
app.use("*", (req, res, next) => {
  userIN = req.session.userID;
  next();
});
