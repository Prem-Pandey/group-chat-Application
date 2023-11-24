console.log(req.body.mssage);
    fs.writeFile('username.text', `${req.body.username}`,{flag: 'a'}, (err ) =>
        err ? console.log(err): res.redirect('/')
    );