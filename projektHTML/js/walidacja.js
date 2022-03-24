document.addEventListener("DOMContentLoaded", function() {
    wypisz();
    });
    function dodajartyste(dane)
    {
    var html = "";
    for (var i = 0; i < dane.Artysci.length; i++) 
    {html+='<p>'+dane.Artysci[i].numer+' <img src="'+dane.Artysci[i].flaga+'" title = "'+dane.Artysci[i].kraj+'"> '+dane.Artysci[i].imie+''+
     ''+dane.Artysci[i].nazwisko+'</p>';
    }
    console.log(html);
    return html;
    }
    function wypisz()
    {
    document.getElementById("fprzycisk").addEventListener('click', function(){
        fetch("data/artysci.json")
        .then(response=>{return response.json();})
        //.then(data=>{data.Artysci.forEach(element=>{dodajartyste(element);}
        .then(dane => {
            document.getElementById("fff").innerHTML = dodajartyste(dane);
        });
    });
    }
var ilosc = 0;
var numer = 0;
function dodaj()
{
        var item = {};
        item.nick = document.getElementById('nick').value;
        item.email = document.getElementById('email').value;
        item.czynnosc = document.getElementById('contact-select').value;
        item.dane = document.getElementById('dane').value;
        item.szczegoly = document.getElementById('szczegoly').value;
        var lista = JSON.parse(localStorage.getItem('lista'));
                if (lista===null) lista=[];
                lista.push(item);
                localStorage.setItem('lista', JSON.stringify(lista));
}

function edycja() {
    var i = parseInt(document.getElementById('nr').value);
    var lista = JSON.parse(localStorage.getItem('lista'));
    var nick = document.getElementById('nick').value;
    var email = document.getElementById('email').value;
    var czynnosc = document.getElementById('contact-select').value;
    var dane = document.getElementById('dane').value;
    var szczegoly = document.getElementById('szczegoly').value;
    lista[i].nick = nick;
    lista[i].email = email;
    lista[i].czynnosc=czynnosc;
    lista[i].dane=dane;
    lista[i].szczegoly = szczegoly;
    localStorage.setItem('lista', JSON.stringify(lista));
    wyswietl();
    
}
function zmiana(i) {
    numer = i;
    var lista = JSON.parse(localStorage.getItem('lista'));
    document.getElementById('nick').value = lista[i].nick;
    document.getElementById('email').value = lista[i].email;
    document.getElementById('contact-select').value = lista[i].czynnosc;
    document.getElementById('dane').value = lista[i].dane;
    document.getElementById('szczegoly').value = lista[i].szczegoly;
    
}
function edycja2() {
    var lista = JSON.parse(localStorage.getItem('lista'));
    var nick = document.getElementById('nick').value;
    var email = document.getElementById('email').value;
    var czynnosc = document.getElementById('contact-select').value;
    var dane = document.getElementById('dane').value;
    var szczegoly = document.getElementById('szczegoly').value;
    lista[numer].nick = nick;
    lista[numer].email = email;
    lista[numer].czynnosc=czynnosc;
    lista[numer].dane=dane;
    lista[numer].szczegoly = szczegoly;
    localStorage.setItem('lista', JSON.stringify(lista));
    wyswietl();
    document.getElementById("form").reset();
}
function wyswietl()
{
var lista = JSON.parse(localStorage.getItem('lista'));
        if (lista===null) document.getElementById('Propozycje').innerHTML ="<p>Nie ma żadnych propozycji</p>";
        else {
                var tresc = "<br><br><table border='1'><tbody><tr><td>Autor: </td><td>Zmiana: </td><td>Dane muzyka: </td><td>Szczegóły: </td><td> Edycja: </td></tr>";
                for(i=0;i<lista.length;i++) {
                        var p = 'item-' + i;
                        tresc += '<tr><td>' + lista[i].nick + '</td><td>' + lista[i].czynnosc + '</td><td>' + lista[i].dane + '</td><td>' + lista[i].szczegoly + '</td><td>';
                        tresc += "<button type='button' class='btn btn-primary'onclick='zmiana(" + i + ")'>Wybierz</button>";
                        tresc += '</td></tr>';
                }
                tresc += '</tbody></table>';
                document.getElementById('Propozycje').innerHTML = tresc;
        }
}

function wyczysc_el() {
    document.getElementById("form").reset();
    var lista = JSON.parse(localStorage.getItem('lista'));
    if (confirm("Usunąć propozycje?")) {
        lista.splice(numer, 1);
        if(!lista) wyczysc();
    };
    localStorage.setItem('lista', JSON.stringify(lista));
    wyswietl();
}
function wyczysc()
{
    localStorage.clear();
    document.getElementById('Propozycje').innerHTML = "<p>Nie ma żadnych propozycji</p>";
}

function sprawdzPole(pole_id,obiektRegex) {
    var obiektPole = document.getElementById(pole_id);
    if(!obiektRegex.test(obiektPole.value)) return (false);
    else return (true);
}
function sprawdz_radio(nazwa_radio){
    var obiekt=document.getElementsByName(nazwa_radio);
     for (i=0;i<obiekt.length;i++)
     { wybrany=obiekt[i].checked;
    if (wybrany) return true; }
    return false;
}
function sprawdz_box(box_id)
{  var obiekt=document.getElementById(box_id);
    if (obiekt.checked) return true;
    else return false;
}
function pokazDane()
{
    var checkboxes = document.getElementsByName('selector2');
    var radiobuttons = document.getElementsByName('selector');
    var radio_id;
    var muzyka = "";
    for( var i = 0; i < radiobuttons.length; i++ )
    {
        if( i < checkboxes.length )
        {
            if( checkboxes[i].checked) 
            {
                muzyka += checkboxes[i].value+" ";
                console.log(muzyka);
            }
            
        }
        if(radiobuttons[i].checked) 
        {
            radio_id = i;
        }
    }
    var dane="Następujące dane zostaną wysłane:\n";
    dane+="Nick: "+document.getElementById('nick').value+"\n";
    dane+="Płeć: " + radiobuttons[radio_id].value + "\n";
    dane+="Gatunki muzyczne: " + muzyka.value + "\n";
    dane+="Email: "+document.getElementById('email').value+"\n";
    dane+="Czynność: " +document.getElementById('contact-select').value+"\n"; 
    dane+="Dane muzyka: " + document.getElementById('dane').value+"\n";
    dane+="Szczegóły: " + document.getElementById('szczegoly').value+"\n";

    if (window.confirm(dane)) return true;
    else return false;
}
function sprawdz2()
{    var ok=true; 
    obiektnick = /^[a-zA-Z0-9 _-]{6,25}$/; 
    obiektemail = 
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/; 
    obiektDane=/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}([- ][a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}$)?/;
    if (!sprawdzPole("nick",obiektnick))
    { ok=false;
        document.getElementById("komunikat_nick").innerHTML="Nick musi zawierać od 6 do 25 znaków!";
    }
    else document.getElementById("komunikat_nick").innerHTML="";
    
    if (!sprawdzPole("email",obiektemail))
    { ok=false;
        document.getElementById("komunikat_email").innerHTML="Wpisz poprawny email!";
    }
    else document.getElementById("komunikat_email").innerHTML="";
    
    if (!sprawdzPole("dane",obiektDane))
    { ok=false;
        document.getElementById("komunikat_dane").innerHTML="Wpisz imie i naziwsko muzyka!";
    }
    else document.getElementById("komunikat_dane").innerHTML="";
    
    
    var czy_zaznaczone = false;
    if (sprawdz_box("pop")) czy_zaznaczone=true;
    if (sprawdz_box("rock")) czy_zaznaczone=true;
    if (sprawdz_box("hip-hop")) czy_zaznaczone=true;
    if (sprawdz_box("inne")) czy_zaznaczone=true;

    if (!czy_zaznaczone) 
    {
        ok=false;
        document.getElementById("komunikat_check").innerHTML="Nie zaznaczono żadnej kategorii muzycznej!";
    }
    else document.getElementById("komunikat_check").innerHTML="";
    if(ok)
    {
         edycja2();
        document.getElementById("form").reset();
    }
    else return ok;
}


function sprawdz()
{    var ok=true; 
    obiektnick = /^[a-zA-Z0-9 _-]{6,25}$/; 
    obiektemail = 
    /^([a-zA-Z0-9])+([.a-zA-Z0-9_-])*@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-]+)+/; 
    obiektDane=/^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}([- ][a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,20}$)?/;
    if (!sprawdzPole("nick",obiektnick))
    { ok=false;
        document.getElementById("komunikat_nick").innerHTML="Nick musi zawierać od 6 do 25 znaków!";
    }
    else document.getElementById("komunikat_nick").innerHTML="";
    
    if (!sprawdzPole("email",obiektemail))
    { ok=false;
        document.getElementById("komunikat_email").innerHTML="Wpisz poprawny email!";
    }
    else document.getElementById("komunikat_email").innerHTML="";
    
    if (!sprawdzPole("dane",obiektDane))
    { ok=false;
        document.getElementById("komunikat_dane").innerHTML="Wpisz imie i naziwsko muzyka!";
    }
    else document.getElementById("komunikat_dane").innerHTML="";
    
    
    var czy_zaznaczone = false;
    if (sprawdz_box("pop")) czy_zaznaczone=true;
    if (sprawdz_box("rock")) czy_zaznaczone=true;
    if (sprawdz_box("hip-hop")) czy_zaznaczone=true;
    if (sprawdz_box("inne")) czy_zaznaczone=true;

    if (!czy_zaznaczone) 
    {
        ok=false;
        document.getElementById("komunikat_check").innerHTML="Nie zaznaczono żadnej kategorii muzycznej!";
    }
    else document.getElementById("komunikat_check").innerHTML="";
    if(ok)
    {
         dodaj();
        document.getElementById("form").reset();
    }
    else return ok;
}
