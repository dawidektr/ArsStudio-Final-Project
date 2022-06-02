Aby poprawnie włączyć aplikację należy postawić bazę danych MySql. Umieściłem w tym katalogu strukturę dla tej bazy danych plik: tractors.sql.
Następnie należy backend zmienić nazwę pliku config_example.js na config.js oraz ustawić połączenie z bazą danych. Ja w projekcie używałem pakietu XAMP.
Kolejnym krokiem będzie przejściu do folderu frontent i uruchomieniu komend npm install a następnie npm run build.
Wygenerowany folder należy umieścić w folderze backend.
Następnie w folderze backend należy uruchomić komendę npm install.
Aplikację możemy uruchomić komendą npm run start lub nodemon app.js.
Aplikacja będzie działa pod tym linkiem: http://localhost:5000/
