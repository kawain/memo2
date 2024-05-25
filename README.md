# memo2

## 開発の仕方

### phpのビルトインウェブサーバーを起動

`php -S localhost:8008`

これが必要
```
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');

```

### reactの開発サーバー起動

`npm run start`
