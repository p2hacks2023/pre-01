// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const auth = require('./auth'); // authモジュールの読み込み
const bcrypt = require('bcryptjs'); // bcryptの読み込み

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL接続設定
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Tt1023hH',
  database: 'sns_app',
});

// MySQL接続
db.connect((err) => {
  if (err) {
    console.error('MySQL connection error:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

// ルートエンドポイント
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// 認証関連のエンドポイントを追加
app.post('/register', (req, res) => {
  const { email, password, username } = req.body;

  // パスワードのハッシュ化
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Password hash error:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // データベースへのユーザー登録処理
    const sql = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
    db.query(sql, [email, hash, username], (err, result) => {
      if (err) {
        console.error('User registration error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.status(201).json({ message: 'User registered successfully' });
    });
  });
});

app.post('/login', auth.login);
app.get('/secure-endpoint', auth.verifyToken, (req, res) => {
  res.json({ message: 'Secure endpoint accessed successfully', user: req.user });
});

// プロフィール情報取得エンドポイント
app.get('/user-profile', auth.verifyToken, (req, res) => {
  const userId = req.user.userId;

  // データベースからユーザーの情報を取得
  const sql = 'SELECT id, username, email FROM users WHERE id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('User profile retrieval error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
    } else {
      const userProfile = results[0];
      res.json({ userProfile });
    }
  });
});



// 投稿作成エンドポイント
app.post('/post', auth.verifyToken, auth.createPost);

// /posts エンドポイントの追加
app.get('/posts', (req, res) => {
  // データベースから全ての投稿を取得
  const sql = 'SELECT * FROM posts';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ posts: results });
    }
  });
});

app.get('/posts/:userId', (req, res) => {
  const userId = req.params.userId;

  // データベースから特定のユーザーIDに関連する投稿を取得
  const sql = 'SELECT * FROM posts WHERE user_id = ?';
  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching user posts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ posts: results });
    }
  });
});

// その他のエンドポイントを追加

// サーバーを起動
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
