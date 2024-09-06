# Exemplu de testare a unei componente

## Context

Avem un meniu cu trei acțiuni numite true, partial și false, și două statusuri: status1 și status2.

Daca status1 == true && status2 == true => actiunea true este activată, restul sunt disabled
Daca status1 == true && status2 == false || status1 == false && status2 == true => actiunea partial este activată, restul sunt disabled
Daca status1 == false && status2 == false => actiunea false este activată, restul sunt disabled
Actiunea enabled va fi prima in lista, urmata de restul sortate in ordine alfabetica
## Teste

In fisierul `app.component.spec.ts` gasim cate un test pentru verifica fiecare situatie descrisa anterior => 4 teste.
Fiecare test verifica daca actiunea este enabled, daca aceasta ocupa prima pozitie in meniu si daca urmatoarele actiuni se afla in continuarea ei, in ordine alfabetica.
