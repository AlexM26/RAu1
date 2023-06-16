var db = require("../conexion/conexion");

exports.save = (req,res) =>{
    const cNombre = req.body.Nombre;
    const cDescripcion = req.body.Descripcion;
    const cPlataforma = req.body.Plataforma;
    const cPrecio = req.body.Precio;
    const cImagen = req.body.Img;
    db.query('INSERT INTO Juegos (Nombre,Imagen,Descripcion,Plataforma,Precio) VALUES (?,?,?,?,?)',
    [cNombre,cImagen,cDescripcion,cPlataforma,cPrecio],
    (error, resultado)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('productos')
        }
    });
}

exports.edit = (req,res) =>{
    const cID = req.body.ID;
    const cNombre = req.body.Nombre;
    const cDescripcion = req.body.Descripcion;
    const cPlataforma = req.body.Plataforma;
    const cPrecio = req.body.Precio;
    const cImagen = req.body.Img;
    db.query('UPDATE Juegos SET ? WHERE ID = ?',
    [{ID:cID,Nombre:cNombre,Imagen:cImagen,Descripcion:cDescripcion,Plataforma:cPlataforma,Precio:cPrecio},cID],
    (error, resultado)=>{
        if(error){
            console.log(error);
        }
        else{
            res.redirect('productos')
        }
    });
}

exports.auth = (req, res)=>{
    const email = req.body.email;
    const pass = req.body.password;
    if(email && pass){
        db.query('SELECT * FROM Usuarios WHERE Correo = ?',[email],
        function(error,resultado){
            if(resultado.length == 0 || (pass != resultado[0].Contra))
            {
                console.log("Email o password incorrectos");
                res.redirect('login')
            }
            else
            {
                console.log("Inicio de sesion completado");
                res.redirect('productos')
            }
        });
    }
    else
    {
        console.log("Rellene los espacios faltantes");
        res.redirect('login')
    }
}