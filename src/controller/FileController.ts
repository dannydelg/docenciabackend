import { clearScreenDown } from "readline";

import { getRepository } from "typeorm";
import { Aspirante } from "../entity/Aspirante";
const path = require("path");
import { Request, Response } from "express";
import { Carrera } from "../entity/Carrera";
import { Curso } from "../entity/Curso";




export class FileControler {
  static upload = async (req, res) => {
    console.log(req.file);
    
 
    const { nombre, email } = req.body;

    const aspirante = new Aspirante();

    aspirante.nombre = nombre;
    aspirante.email = email;
    aspirante.curriculum = req.file.filename;

    const aspiranteRepository = getRepository(Aspirante);

    try {
      const emailRegistrado = await aspiranteRepository.findOneOrFail({email: email});
      if(emailRegistrado) return res.json({message:"Usuario ya registrado"});
    } catch (error) {
      
    }



    try {
      const resp = await aspiranteRepository.save(aspirante);
      return res.json({ message: "Aspirante guardado exitosamente" });
    } catch (error) {
      //console.log(error)
      res.status(400).json({ message: "Error al guardar" });
    }

    console.log(req.body);
    console.log(req.file);

    return res.json({ msg: "Curriculum recibidos" });
  };

  static verCarreras = async (req, res) => {

    const carreraRepository = getRepository(Carrera);

    const lasCarreras = await carreraRepository.find();

    //console.log(lasCarreras);

    return res.json(lasCarreras);

    

  }

  static verCursos = async (req, res) => {

    console.log(req.params);
    const { id } = req.params;
    const cursoRepository = getRepository(Curso);

    const lasCursos = await cursoRepository.find({carreraId: id});

    console.log(lasCursos);

    return res.json(lasCursos);

    

  }
}

export default FileControler;
