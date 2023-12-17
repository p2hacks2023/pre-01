const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const crypto = require('crypto');

// ランダムな文字列を生成する関数
const generateSecretKey = () => {
  return crypto.randomBytes(32).toString('hex');
};

// JWT署名キーを生成
const secretKey = generateSecretKey();

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

const register = (req, res) => {
  const { email, password, username } = req.body;

  // パスワードのハッシュ化
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      console.error('Password hash error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      // データベースへのユーザー登録処理
      const sql = 'INSERT INTO users (email, password, username) VALUES (?, ?, ?)';
      db.query(sql, [email, hash, username], (err, result) => {
        if (err) {
          console.error('User registration error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else {
          res.status(201).json({ message: 'User registered successfully' });
        }
      });
    }
  });
};

const login = (req, res) => {
  const { email, password } = req.body;

  // ユーザーの取得
  const sql = 'SELECT * FROM users WHERE email = ?';
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.error('User retrieval error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else if (results.length === 0) {
      res.status(401).json({ error: 'Invalid email or password' });
    } else {
      const user = results[0];

      // パスワードの検証
      bcrypt.compare(password, user.password, (err, match) => {
        if (err) {
          console.error('Password comparison error:', err);
          res.status(500).json({ error: 'Internal Server Error' });
        } else if (match) {
          // JWTトークンの生成
          const token = jwt.sign({ userId: user.id, username: user.username }, secretKey, { expiresIn: '1h' });
          res.json({ token });
        } else {
          res.status(401).json({ error: 'Invalid email or password' });
        }
      });
    }
  });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  console.log('Authorization Header:', authHeader);

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ error: 'Token is required' });
  }

  const token = authHeader.split(' ')[1];

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      console.error('Token verification error:', err);
      return res.status(401).json({ error: 'Invalid token' });
    }

    req.user = decoded;
    next();
  });
};


const getUserProfile = (req, res) => {
  const userId = req.params.userId;

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
};

const createPost = (req, res) => {
  const { content } = req.body;
  const userId = req.user.userId;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  // データベースに投稿を作成
  const sql = 'INSERT INTO posts (user_id, content, created_at) VALUES (?, ?, NOW())';
  db.query(sql, [userId, content], (err, result) => {
    if (err) {
      console.error('Post creation error:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Post created successfully' });
    }
  });
};

const getPosts = (req, res) => {
  // データベースから全ての投稿を取得
  const sql = 'SELECT * FROM posts ORDER BY created_at DESC';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching posts:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json({ posts: results });
    }
  });
};

module.exports = {
  register,
  login,
  verifyToken,
  getUserProfile,
  createPost, 
  getPosts,
};