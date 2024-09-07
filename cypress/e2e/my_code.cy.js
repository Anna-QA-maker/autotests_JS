import * as start_page from "../locators/start_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"
import * as data from "../helpers/default_data.json"
describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/');
        cy.get(start_page.title).should('have.css','font-family','Finlandica, sans-serif'); //Проверка названия и типа шрифта  формы авторизации
        cy.get(start_page.footer).should('be.visible').contains('qa.studio').trigger('mouseover') // Проверка что в футере ссылка видна пользователю называется qa.studio, и имеет ховер эффект
        cy.get(start_page.new_pass_btn).should('have.css','color','rgb(0, 85, 152)') //Проверка, что кнопка Забыл пароль имеет соотв. цвет.
    });
          
    it('Авторизация: верные логин и пароль', function () {
         
         cy.get(start_page.email).type(data.login) // Ввод верного логина
         cy.get(start_page.password).type(data.password) // Ввод верного пароля
         cy.get(start_page.login_button).contains('Войти').click()  // Проверка на кнопке слова войти и нажать на нее
         cy.get(result_page.title).contains('Авторизация прошла успешно') // Проверка наличия текста успешной авторизации
         cy.get(result_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
     })

     it('Авторизация: верный логин и НЕверный пароль', function () {
        
        cy.get(start_page.email).type(data.login) // Ввод верного логина
        cy.get(start_page.password).type('iLoveqastudio2') // Ввод НЕверного пароля
        cy.get(start_page.login_button).contains('Войти').click()  // Проверка на кнопке слова войти и нажать на нее
        cy.get(result_page.title).contains('Такого логина или пароля нет') // Проверка наличия текста ошибки ввода логина или пароля
        cy.get(result_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
    })

    it('Авторизация: НЕверный логин и верный пароль', function () {
       
        cy.get(start_page.email).type('geman@dolnikov.ru') // Ввод НЕверного логина
        cy.get(start_page.password).type(data.password) // Ввод верного пароля
        cy.get(start_page.login_button).contains('Войти').click()  // Проверка на кнопке слова войти и нажать на нее
        cy.get(result_page.title).contains('Такого логина или пароля нет') // Проверка наличия текста ошибки ввода логина или пароля
        cy.get(result_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
    })

    it('Авторизация: НЕверный логин (без @) и верный пароль', function () {
        
        cy.get(start_page.email).type('germandolnikov.ru') // Ввод логина без @
        cy.get(start_page.password).type(data.password) // Ввод верного пароля
        cy.get(start_page.login_button).contains('Войти').click()  // Проверка на кнопке слова войти и нажать на нее
        cy.get(result_page.title).contains('Нужно исправить проблему валидации') // Проверка наличия текста об ошибке валидации
        cy.get(result_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
    })  

    it('Авторизация: верные логин и пароль с заглавными символами', function () {
        
        cy.get(start_page.email).type('GerMan@Dolnikov.ru') // Ввод верного логина (с заглавными буквами)
        cy.get(start_page.password).type(data.password) // Ввод верного пароля
        cy.get(start_page.login_button).contains('Войти').click()  // Проверка на кнопке слова войти и нажать на нее
        cy.get(result_page.title).contains('Авторизация прошла успешно') // Проверка наличия текста успешной авторизации
        cy.get(result_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
    })

    it('Восстановление пароля', function () {
        cy.get(start_page.new_pass_btn).click() // Найти кнопку забыл пароль и нажать ее
        cy.get(recovery_password_page.title).contains('Восстановите пароль').should('have.css','font-family','Finlandica, sans-serif') // Проверка названия и типа шрифта восстановления
        cy.get(recovery_password_page.close).should('be.visible') // Проверка что кнопка крестик видна пользователю
        cy.get(recovery_password_page.footer).should('be.visible').trigger('mouseover') // Проверка что кнопка отправить код видна пользователю и имеет ховер эффект
    })
 }) 