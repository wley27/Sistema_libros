// src/data/librosDemo.js
import cienAnos from '../assets/cien-anos.jpg';
import milNovecientos84 from '../assets/1984.webp';
import donQuijote from '../assets/don-quijote.webp';
import elPrincipito from '../assets/el-principito.avif';
import harryPotter from '../assets/harry-potter.webp';
import sombraViento from '../assets/sombra-viento.webp';
import orgulloPrejuicio from '../assets/orgullo-prejuicio.jpg';
import elAlquimista from '../assets/el-alquimista.webp';
import cronicaMuerte from '../assets/cronica-muerte.webp';
import juegosHambre from '../assets/juegos-hambre.jpg';

const librosDemo = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    genero: "Realismo mágico",
    portada: cienAnos,
    descripcion: "Una novela épica que narra la historia de la familia Buendía en Macondo.",
    reseñas: []
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    genero: "Ciencia ficción distópica",
    portada: milNovecientos84,
    descripcion: "Una historia sombría sobre un futuro totalitario gobernado por el Gran Hermano.",
    reseñas: []
  },
  {
    id: 3,
    titulo: "Don Quijote de la Mancha",
    autor: "Miguel de Cervantes",
    genero: "Clásico",
    portada: donQuijote,
    descripcion: "Las aventuras de un caballero que confunde la realidad con los libros de caballería.",
    reseñas: []
  },
  {
    id: 4,
    titulo: "El Principito",
    autor: "Antoine de Saint-Exupéry",
    genero: "Fábula",
    portada: elPrincipito,
    descripcion: "Una historia poética y filosófica sobre un pequeño príncipe que visita planetas.",
    reseñas: []
  },
  {
    id: 5,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    genero: "Fantasía",
    portada: harryPotter,
    descripcion: "El inicio de la historia de Harry Potter en el mundo mágico de Hogwarts.",
    reseñas: []
  },
  {
    id: 6,
    titulo: "La sombra del viento",
    autor: "Carlos Ruiz Zafón",
    genero: "Misterio",
    portada: sombraViento,
    descripcion: "Un niño descubre un libro olvidado que lo lleva a una gran intriga literaria.",
    reseñas: []
  },
  {
    id: 7,
    titulo: "Orgullo y prejuicio",
    autor: "Jane Austen",
    genero: "Romance",
    portada: orgulloPrejuicio,
    descripcion: "Una historia sobre la vida y el amor en la Inglaterra del siglo XIX.",
    reseñas: []
  },
  {
    id: 8,
    titulo: "El alquimista",
    autor: "Paulo Coelho",
    genero: "Filosófico",
    portada: elAlquimista,
    descripcion: "La travesía de un joven pastor en busca de su leyenda personal.",
    reseñas: []
  },
  {
    id: 9,
    titulo: "Crónica de una muerte anunciada",
    autor: "Gabriel García Márquez",
    genero: "Novela corta",
    portada: cronicaMuerte,
    descripcion: "Una novela sobre un asesinato que todos sabían que ocurriría.",
    reseñas: []
  },
  {
    id: 10,
    titulo: "Los juegos del hambre",
    autor: "Suzanne Collins",
    genero: "Ciencia ficción",
    portada: juegosHambre,
    descripcion: "Katniss Everdeen lucha por sobrevivir en un cruel espectáculo televisado.",
    reseñas: []
  }
];

export default librosDemo;
