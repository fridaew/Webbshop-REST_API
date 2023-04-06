const User = require('../schemas/userSchema')
const bcrypt = require('bcryptjs')
const auth = require('../authentication/auth')

exports.registerNewUser = async(req, res)=>{
    const { firstName, lastName, email, password } = req.body; //byggs ihop när vi gör en fetch. Behöver inte heta samma som i mitt schema, men det är det vi skickar i body

    if(!firstName || !lastName || !email || !password){ //kollar så att allt är ifyllt
        return res.status(400).json({
            message: 'You need to enter all the fields'
        })
    }

    const result = await User.exists({email}) //kollar om användaren redan finns

    if(result) {
    return res. status(400).json({
    message: 'This adress is already taken'  
    })

    }

    //kryptera lösenord (hash)
    //hash returnerar ett promise

    const salt = bcrypt.genSaltSync(10) //10 är default

    bcrypt.hash(password, salt, (err, hash)=> {
        if(err){
            return res.status(500).json({
                message: 'Failed when encrypting the password'
            })
        }

        User.create({ firstName, lastName, email, passwordHash:hash})
        .then(data => { // när jag har skapat min användare så vill jag ksicka in ett response som inehåller en token.
            res.status(201).json({
                token: auth.generateToken(data)
            }) //strukturen som vi har i vårat schema
    })
    
    })



}


exports.loginUser = (req,res)=>{
    const {email, password} = req.body;

    if(!email || !password) {
        return res.status(400).json({
            message: 'You need to enter all te fields'
        })
    }

    User.findOne({email})
    .then(data => {
        if(!data){ //hitta en user, om inte så får vi detta felmeddelande
            return res.status(401).json({
                message: 'Incorrect credentials'
            })
        }

        bcrypt.compare(password, data.passwordHash, (err, result)=>{
            if(err) {
                return res.status(500).json({
                    message: ' Somethin went wrong when creating password'
                })
            }

            if(!result) {
                return res.status(401).json({
                    message: 'Incorrect credentials'
                }) 
            }

            res.status(200).json({token: auth.generateToken(data)})
        })
    })

}