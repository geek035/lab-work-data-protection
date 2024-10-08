# Разработка веб-приложения разграничения полномочий пользователей на основе парольной аутентификации
Выполнил: Кудрявцев Савва. Группа А-13-21.
## Запуск программы
Приложение запускается на локальном сервере _localhost_. Сервер находится по адресу <code>http://localhost:5000</code>, сайт - <code>http://localhost:4200</code>  
Для запуска можно запустить <code>run.bat</code>, либо самостоятельно через терминал / командную строку с помощью следующих команд:
1. фронтенд: npm run start после того, как подтянули все пакеты с помощью npm install
2. бэкэнд: dotnet run <br>

Для запуска необходим .NET последних версих.
## Содержание задания
1.	Программа должна обеспечивать работу в двух режимах: администратора (пользователя с фиксированным именем ADMIN или аналогичным) и обычного пользователя.
2.	В режиме администратора программа должна поддерживать следующие функции (при правильном вводе пароля):
    * смена пароля администратора (при правильном вводе старого пароля);
    * просмотр списка имен зарегистрированных пользователей и установленных для них параметров (блокировка учетной записи, включение ограничений на выбираемые пароли) – всего списка целиком в одном окне или по одному элементу списка с возможностью перемещения к его началу или концу;
    * добавление уникального и нечувствительного к регистру буквенных символов имени нового пользователя к списку с пустым паролем (строкой нулевой длины);
    * блокирование возможности работы пользователя с заданным именем;
    * включение или отключение ограничений на выбираемые пользователем пароли (в соответствии с индивидуальным заданием, определяемым номером варианта);
    * завершение работы с программой.
4.	В режиме обычного пользователя программа должна поддерживать только функции смены пароля пользователя (при правильном вводе старого пароля) и завершения работы, а все остальные функции должны быть заблокированы.
5.	После своего запуска программа должна запрашивать у пользователя в специальном окне входа ввод его имени и пароля. При любом вводе пароля его символы всегда должны на экране заменяться символом ‘*’.
6.	При отсутствии введенного в окне входа имени пользователя в списке зарегистрированных администратором пользователей программа должна выдавать соответствующее сообщение и предоставлять пользователю возможность повторного ввода имени или завершения работы с программой.
7.	При неправильном вводе пароля программа должна выдавать соответствующее сообщение и предоставлять пользователю возможность повторного ввода. При трехкратном вводе неверного пароля работа программы должна завершаться.
8.	При первоначальном вводе пароля (обязательном при первом входе администратора или пользователя с зарегистрированным ранее администратором именем) и при дальнейшей замене пароля программа должна просить пользователя подтвердить введенный пароль путем его повторного ввода.
9.	Если выбранный пользователем пароль не соответствует требуемым ограничениям (при установке соответствующего параметра учетной записи пользователя), то программа должна выдавать соответствующее сообщение и предоставлять пользователю возможность ввода другого пароля, завершения работы с программой (при первом входе данного пользователя) или отказа от смены пароля.
10.	Информация о зарегистрированных пользователях, их паролях, отсутствии блокировки их работы с программой, а также включении или отключении ограничений на выбираемые пароли должна сохраняться в специальном файле. При первом запуске программы этот файл должен создаваться автоматически и содержать информацию только об администраторе, имеющем пустой пароль.
11.	Интерфейс с программой должен быть организован на основе меню, обязательной частью которого должно являться подменю «Справка» с командой «О программе». При выборе этой команды должна выдаваться информация об авторе программы и выданном индивидуальном задании. Интерфейс пользователя программы может также включать панель управления с дублирующими команды меню графическими кнопками и строку состояния.
12.	Для реализации указанных в пунктах 2-3 функций в программе должны использоваться специальные диалоговые формы, позволяющие пользователю (администратору) вводить необходимую информацию.

## Ограничения на выбираемые пароли
Чередование символов кириллицы, латинских букв, цифр и снова символов кириллицы.
