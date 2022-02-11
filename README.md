# InFine

## Introduction

> The final project of Coding Academy by EPITECH. /

- Ce site regroupe les événements autour de Bordeaux.
- Il a été réalisé par Olivier BUTTNER, Vincent PIALOUX, Daniel AMBROSIO, Xavier LE PAJOLEC, Joël RAZAFINJATOVO en Next.js, React et MongoDB sous la supervision de Vincent FAGOAGA et Alexandra PICOT.
- Vous avez la possibilité de vous inscrire, de visualiser des événements, de les booker, de le noter ainsi que de poster des photos ou des commentaires.
- Un espace administrateur permet de gérer les événements visibles sur le site ainsi que de modérer les commentaires.

## Code Samples

##

> example

    case "POST":

    try {

                const user = await User.create(req.body);

                const chaine = req.headers.authorization;
                const token = chaine.split(" ")[1];
                const connecte = jwt.decode();

                if (connecte.role !== "admin") {
                    res.status(403).json({success: false, message: "vous ne pouvez pas créer d'utilisateur"})
                } else {
                    res.status(201).json({success: true, user});
                }
            } catch (error) {
                res.status(400).json({success: false, error: error.message});
            }
            break;
        default:
            res.status(400).json({success: false, error: error.message});
            break;

## Installation

> L'installation se fait par la commande:

- npm i



## ENSEMBLE DES ROUTES API

    AUTH :

        POST     /auth/forgotPassword
            body : email
            response : 200 + email envoyé
        POST     /auth/login
            body : username , password
            response : 200 , token
        POST     /auth/register
            body : username , email , password,passwordConfirmation,address,imageAvatar(file)
            response : 200 , imageAvatar stocké sur cloudinary
        PUT      /auth/updatePassword
            body : token
            response : 200

    BOOKINGS :

        GET     /bookings/{id_booking}
            response : 200 , booking
        POST    /bookings/{id_event}
            bearer TOKEN : token
            response : 200 , email envoyé
        DELETE  /bookings/{id_event}
            response : 200
        GET     /bookings/
            response : 200 , [bookings]

    COMMENTS :

        POST    /comments/{id_event}
            bearer TOKEN : token
            body : content , picture(file)
            response : 201
        GET     /comments/{id_comment}
            response : 200 , Comment
        DELETE   /comments/{id_comment}
            response : 200

        GET     /comments/
            responser : 200 , [comments]

    EMAIL :

        POST    /email/contactEmail/
            body : email
            response : 200 , email envoyé

    EVENTS :

        GET     /events/{id_event}
            response : 200 , event
        POST    /events/{id_event} // Ajout de la note de l'évenement
            body : note
            Bearer TOKEN : token
            response : 200
        DELETE  /events/{id_event}
            response : 200
        GET     /events/
            response : 200 , [events]
        POST    /events/
            body : Event
            response : 200

    SEARCH :

        GET     /search/events //filter by keywords
            response : 200 ,[events]

    USERS :

        GET     /users/{id_user}
            response : 200 , user
        PUT     /users/{id_user}
            response : 200
        DELETE  /users/{id_user}
            response : 200
        GET     /users/
            response : 200 , [users]

     MYPROFILE :

        GET     /users/myProfile/myInfos
            Bearer token : token
            response : 200 , user.myInfos
        GET     /users/myProfile/myEvents
            Bearer token : token
            response : 200 , user.myEvents
        GET     /users/myProfile/myComments
            Bearer token : token
            response : 200 , user.myComments

> Le lancement du serveur :
- npm run serve

