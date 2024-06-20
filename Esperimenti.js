const campo = document.getElementById('campo');
const test = document.getElementById('testami');
const prova = document.getElementById('provami')
const risultato = document.getElementById('risultato')

const lavori = [
{
  anni: 3,
  div: 100,
  bestem: 15
},
{
  anni: 5,
  div: 190,
  bestem: 20
},
{
  anni: 2,
  div: 40,
  bestem: 10
}]

const paghe = lavori.map((oggetto) => oggetto.paga = 1500);
console.log(lavori)

lavori[0].paga = 1700;
lavori[1].paga = 1200;

const crescita = [...lavori].sort((a, b) => a.paga - b.paga);
console.log(crescita)

const filtro = crescita.filter((oggetto) => oggetto.div > 50);
console.log(filtro)

const cerca = filtro.find((oggetto) => oggetto.bestem === 20);
console.log(cerca)
