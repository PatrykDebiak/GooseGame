/********************************************************************
* nazwa funkcji: losujLiczbe(min, max)
*
* parametry wejściowe: min, max - przechowuje dwie liczby calkowite
*                     
* wartość zwracana: liczbe calkowita
* opis funkcji: losuje liczbe z przedzialu min, max i zwraca ją
*
* autor: Patryk Dębiak
* *****************************************************************/
function losujLiczbe(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
/********************************************************************
* nazwa funkcji: rysuj()
*
* parametry wejściowe: x - liczba całkowita, symbolizujaca liczbe bledow
*                     
* wynik funkcji: wykonuje dana operacje w zaleznosci od liczby x  
* opis funkcji: funkcja dostaje ilosc bledow i w zaleznosci 
* od jej ilosci rysuje dany obrazek
*
* autor: Patryk Dębiak
* *****************************************************************/
function rysuj(x){
    switch(x){
        case 1:
            $(function(){
                $('#wisielec').html('<img src="img/zdj1.png" alt="goose">')
            })
            break;
        case 2:
            $(function(){
                $('#wisielec').html('<img src="img/zdj2.png" alt="goose">')
            })
            break;
        case 3:
            $(function(){
                $('#wisielec').html('<img src="img/zdj3.png" alt="goose">')
            })
            break;
        case 4:
            $(function(){
                $('#wisielec').html('<img src="img/zdj4.png" alt="goose">')
            })
            break;
        case 5:
            $(function(){
                $('#wisielec').html('<img src="img/zdj5.png" alt="goose">')
            })
            break;
        case 6:
            $(function(){
                $('#wisielec').html('<img src="img/zdj6.png" alt="goose">')
            })
            break;
       
    }

}
/********************************************************************
* nazwa funkcji: funkcja
*                     
* wynik funkcji: wykonuje operacje jquery
* opis funkcji: przypisana jest do przycisku "wskazówka" po kliknieciu
*               uruchamiana jest funkcja która wyświetla komunikat
*               i okienko z "Rick Roll - Never Gonna Give You Up"
*
* autor: Patryk Dębiak
* *****************************************************************/
function funkcja(){
    
    $(function(){
        $('#menu').html('<p id="apropowskazowek">Gra nie jest, aż tak trudna żebyś potrzebował wskazówek</p>')
        $('#zasady').html('<iframe width="400" height="200" src="https://www.youtube.com/embed/iik25wqIuFo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>')
    })
} 
var jd;
/********************************************************************
* nazwa funkcji: wykonajXML()
*                     
* wynik funkcji: wykonuje wszystkie operacje z tej funkcji
* opis funkcji: wywolywana jest przy załadowaniu strony, pobiera dane
*               z pliku xml(reszta jest poszczególnie opisana w komentarzach )
*
* autor: Patryk Dębiak
* *****************************************************************/
function wykonajXML(){
    $(document).ready(function(){
        $.ajax({
        type:"GET",
        url:"src/baza.xml",
        dataType: 'xml',
        success: function(xml){
            
            var losu = losujLiczbe(-1, 21);
            //pobiera i wyswietla kategorie hasla
            $(xml).find('kategoria').eq(losu).each(function(){
                $('#k').append("kategoria: " + $(this).text() + '<br>')
                
                
        });
        //haslo jest pobrane z pliku xml i przypisane do zmiennej x
        var x = $(xml).find('wyraz').eq(losu).text();
            $(xml).find('wyraz').eq(losu).each(function(){

                //uzupelnia komorki tabelki podkresleniami, w zaleznosci od dlugosci hasla
                for(var i=0; i<($(this).text()).length; i++){
                    $('td').eq(i).append("_");
                    
                }
            
            var licznik = 1;
            var s;
            var bledy = 1;
            var przegrana = "Przegrałeś!           "
            var wygrana = "Wygrałeś!               "
            //funkcja uruchamia sie po kliknieciu w przycisk typu input 
            $('input').click(function(){
                    s = licznik;
                    //sprawdzamy czy literka ktora kliknelismy jest w naszym hasle 
                    for(var i=0; i<x.length; i++){
                     if(jd==x[i]){
                        $('td').eq(i).html(jd);
                        if(licznik==x.length){
                            //jesli warunek jest spelniony wyswietla komunikat o wygranej i zamienia klawiature na przycisk do ponownej gry
                            // $("#k").append("Wygrałeś")
                            $('#klawiatura').html('<button id="reset" onclick="window.location.reload(true);">Zagraj ponownie</button>')
                            for(var i=0; i<wygrana.length;i++){
                                $('td').eq(i).html(wygrana[i])
                            }
                        }
                        licznik++;
                     }
                    
                 
                }
                if(s==licznik){
                        //rysuje wisielca jesli gracz popelni blad i sprawdza ilosc bledow uzytkownika
                        if(bledy==6){
                            //jesli ilosc bledow jest rowna liczbie 6, wyswietla komunikat o przegranej i przycisk do ponownej gry
                            $('#klawiatura').html('<button id="reset" onclick="window.location.reload(true);">Spróbuj ponownie</button>')
                            for(var i=0; i<przegrana.length;i++){
                                $('td').eq(i).html(przegrana[i])
                            }
                            licznik++;
                        }
                        rysuj(bledy);
                        bledy++;
                }
                
            })
                
        });
    }
    })
})
}
//funkcja podmienia klikniety przycisk na taki ktory nie ma zadnej przypisanej funkcji
/********************************************************************
* nazwa funkcji: klik(x)
*               
* dane wejściowe: x - jest to liczba do ktorej jest przypisany dany przycisk
*
* wynik funkcji: zamienia przycisk opowiadajacy x na inny przycisk
*
* opis funkcji: wywolywana jest przy kliknieciu przycisku "klawiatury"
*               na ekranie, funkcja zamienia ten przycisk na taki sam 
*               tylko bez przypisanych nazw i funkcji wywolywanych 
*               przez onclick
*
* autor: Patryk Dębiak
* *****************************************************************/
function klik(x){
$(function(){
    $('.inp').eq(x).html('<input type="button" value="✎">')

})
}