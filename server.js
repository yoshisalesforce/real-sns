// 1. 必要なモジュールのインポート
const express = require("express");
const mongoose = require("mongoose");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const postsRouter = require("./routes/posts");

// 2. 環境変数の設定
require("dotenv").config();
const PORT = 3000;

// 3. Expressアプリケーションの初期化
const app = express();

// 4. ミドルウェアの設定
app.use(express.json());

// 5. ルーティングの設定
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/posts", postsRouter);

// 6. データベース接続
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("MongoDBに接続しました。");
  })
  .catch((err) => {
    console.error("MongoDB接続エラー:", err);
  });

// 7. サーバーの起動
app.listen(PORT, () => console.log("サーバーが起動しました。"));
