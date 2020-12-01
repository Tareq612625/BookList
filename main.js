///GET UI Elements
let form=document.querySelector('#book_form');
let bookList=document.querySelector('#book-list')

//Class
//Book class
class Book{
    constructor(title,author, isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}
//UI class
class UI{
    static addToList(book){
        //console.log(book);
        let list=document.querySelector('#book-list')
        let row=document.createElement('tr')
        row.innerHTML=`<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td>${book.isbn}</td>
                        <td><a href='#' class='delete'>X</a></td>`
        list.appendChild(row);

        ///function call for local Stroge 
        //console.log(row);
        //storeBookLocalStore(row);
        //console.log(row);
    }
    static clearFields(){
        document.getElementById("titleName").value='';
        document.getElementById("authorName").value='';
        document.getElementById("isbnName").value='';
    }
    static showAlert(message, className){
        let div=document.createElement('div');
        div.className=`alert ${className}`;
        div.appendChild(document.createTextNode(message)) ;
        let container=document.querySelector('.container');
        let form=document.querySelector('#book_form');
        container.insertBefore(div,form);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        },1500)
    }
    static deleteFromBook(target){
       // console.log(target);
       if(target.hasAttribute('href')){
           target.parentElement.parentElement.remove();
         Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())
        //console.log(target.parentElement.previousElementSibling.textContent.trim());
           UI.showAlert('Book Remove', 'success')
       }
    }
}

/////// local storage -Class
class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }
        else{
            books=JSON.parse(localStorage.getItem('books'))
        }
        return books;    
    }
    static addBook(book){
        let books=Store.getBooks()
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books))
    }
    static displayBooks(){
        let books=Store.getBooks();
        books.forEach(book=>{
            UI.addToList(book)
        })
    }
    static removeBook(isbn){
        let books=Store.getBooks();

        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1)
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Add event listener
form.addEventListener('submit', newBook);
bookList.addEventListener('click', deleteFromBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks());
//newBook function 
 function newBook(e){
    let title= document.getElementById("titleName").value
    let author= document.getElementById("authorName").value
    let isbn= document.getElementById("isbnName").value

    //let ui=new UI();
    if(title===''|| author===''||isbn===''){
        //alert('please Enter the full form')
        UI.showAlert('Please fill field',"error");
    }
    else{
        let book=new Book(title,author,isbn)

        UI.addToList(book);
    
        UI.clearFields();
        UI.showAlert('Book Added',"success");

        Store.addBook(book)
    }
    e.preventDefault()
}

function deleteFromBook(e){
    //let ui=new UI();
     UI.deleteFromBook(e.target);
    //  UI.showAlert('Book Remove', 'success')

    e.preventDefault();
}
