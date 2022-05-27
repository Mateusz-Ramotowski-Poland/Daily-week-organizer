# Daily-week-organizer
It's my own project. I made it from scratch. Live demo: [_here_](https://mateusz-ramotowski-poland.github.io/Daily-week-organizer/).

## Table of Contents
* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Project Status](#project-status)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

## General Information
It is an application helpful in organizing the day. 

## Technologies Used
Project is created with:
* HTML5
* CSS3
* JS(ES6+)
* Local Storage as 'database'

I was using Chrome developer tools for testing my application.
## Features
Timer section:
- You can add/delete timer. You can have from 1 to 5 timers. 
- Click the start button to launch the timer.
- Click the reset button to cancel the timer. 
- When the timer will reach zero You will hear the song.
- You can edit the timer settings: time, description, and song/ringtone.

To-do-tasks section: 
- Add new tasks.
- You can delete every task.
- Tasks are saved after closing the browser (the app is using local storage for that).

## Project Status
The project is in progress. What I will do next:
- make nice looking layout responsive to all resolutions.
- I am thinking about it...


## Acknowledgements
Thanks [_Jonas Schmedtmann_](https://www.udemy.com/course/the-complete-javascript-course/learn/lecture/22648683?start=420#overview)
 for the basics, which You taught me. Now I can create my own web apps.

## Contact
Created by Mateusz Ramotowski (mateusz.ramotowski.praca@gmail.com) - feel free to contact me!

<!-- WHAT I LEARNED?
Ideas: 
- to do list
- communication with weather api
- calculate how many hours I spent on programming per week - local storage or database
- help to organizing my workouts
- log in/log out

DOM:
- EVENT DELEGATION
- timers
- closure
- adding/cloning/removing nodes 

alfa branch master  version 1.1:
-V 3 timery z różnymi stałymi czasami(1min, 2 min, 3min). Po kliknięciu na obszar timera timer liczy w dół od domyślnej wartości.

beta  version 1.2
-V refaktoryzacja kodu wersji alfa
-V dodatkowo dodaj lub usuń ostatni timer (mogę dodać tyle timerów ilę chcę)

version 1.3
-V add voice after timer reach 0;

-V when you add timer it should be clean without data 
-V test how it works and refactor your code

Version 1.4
-V add button/buttons for setting the timer 
-V Add modal window (form) for timer editing
-V basic version of to-do-list(without local storage)
- testing
- Add modal window after time will reach 0
- Testing
- make nice looking layout for it
- Testing

In the next project start work with (At the beginning it will take more time but it is easier after the app gets bigger and bigger)
1.V Good semantic HTML structure with proper tags.
2.V Create standards for CSS classes, and divide CSS selectors for a few CSS files - it is easier to change something.
3. Create standards for function names and variable names.
4. Divide your CSS code into a few js modules.
5. Refactor Your code from time to time and add comments in harder-to-understand parts of the code
6. Write good README.md file.
7. CONCENTRATE ON ONE TASK - DO THAT TASK AND MAKE COMMIT WITH GOOD DESCRIPTION OF WHAT YOU DONE. START NEXT TASK......
8. DIVIDE CODE INTO SMALL PIECE. wWRITE PIECE OF CODE. TEST IT WELL AND THEN GO TO WRITE NEXT PIECE OF CODE - MORE THINK FROM BEGINNING YOU WILL HAVE LESS BUGS AND FRUSTRATION LATER
9. Selectors in CSS files in alphabetically order - it looks nicer and it is easier to search


What should I fix, consider?
0. dO RESPONSOVE LAYOUT ON ALL SCREEN SIZES
1. Czy przycisk start w edycji timera powinienem restartować timer(w trakcie edycji może grać muzyka), albo przynajmnniej wyłączyć ,uzykę jeśli gra alarm - czy rozwiąże to formularz, który pojawi się gdy Timer dojdzie do zera?
2. Przekroczenie wartości min i max minut i sekund przy edycji timera - da się to zrobić. Jak to rozwiązać?
3. Nie działa dobrze przycisk delete timer - zatrzymuję piosenkę dla ostatniego timera zawsze dla następnych już nie.
Utwórze 5 timerów. ustaw alarm na ostatnim naciśnij delete. potem ustaw alarm na ostatnim naciśnij delete, potem ustaw alarm na ostatnim naciśnij delete.... znajdź ten bug. 
4. Zrób main__form--modal2 w index.html . Dodaj wydarzenia do tego modala - po tym jak timer doliczy do 0 to wtedy ma sie on pojawić.
5. Use program to make songs shorter - less to download
6. Inne zachowanie po wcisnieciu restart timer btn  - włącz timer z danymi, które były poprxednio: Utwórx dwie nowe tabele dla cxasów i description(?). Może użyj do tego przycisku  z main__form--modal2 - lub obu wymienionych przycisków.
7. Czy warto mieć main__form--modal2 i main__form--modal1 -  dwie klasy z identycznym stylowaniem. POmysl o powiazaniem tego z dodawaniem wydarzenia JS.
8. Uncaught TypeError: Cannot set properties of null (setting 'currentTime')
    at countdown-timers.js:92:42 Dodaj warunek. Czyu można przewinąć piosenkę, która nie grała ? 
9. Dodaj kolejny commit po dodaniu dalszych uwag przed zaczęciem pracy
-->