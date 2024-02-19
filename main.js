/**
1. Xây dựng chức năng hiển thị (2 điểm)
Hiển thị danh sách sản phẩm theo dạng table
2. Xây dựng chức năng xóa (2 điểm)
Xóa sản phẩm: 1đ
Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ
3. Xây dựng chức năng thêm mới (2 điểm)
Thêm sản phẩm : 1 đ
Hiển thị thông báo sau khi thêm : 0.5đ
Validate form: 0.5đ
4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
Cập nhật sản phẩm: 1đ
Hiển thị thông báo sau khi cập nhật: 0.5đ
Validate form: 0.5đ
5. Xây dựng chức năng đăng nhập (1 điểm) 
Đăng nhập thành công : 0.5đ
Thông báo sau khi đăng nhập thành công: 0.5đ
6. Xây dựng giao diện sử dụng bootstrap hoặc tailwindcss (1 điểm)
*/

// 1. Xây dựng chức năng hiển thị (2 điểm)
// Hiển thị danh sách sản phẩm theo dạng table

let url = "http://localhost:3000/products";
let tbody = document.querySelector("tbody");

// fetch('gửi yêu cầu').then('phản hồi').then('nhận dữ liệu').catch('lỗi trả về');

fetch(url).then((res) => res.json()).then((data) => {
    console.log(data);
    let html = data.map((pro) => {
      return /*html*/` <tr>
        <td>${pro.id}</td> 
        <td>${pro.name}</td>
        <td>${pro.price}</td>
        <td><button class="btn-edit btn btn-success" data-id="${pro.id}">Sửa</button> | <button class="btn-del btn btn-danger" data-id="${pro.id}">Xóa</button></td>
    </tr>`;
    }).join(' ');
    tbody.innerHTML = html;
// 2. Xây dựng chức năng xóa (2 điểm)
// Xóa sản phẩm: 1đ
// Xóa có confirm và hiển thị thông báo sau khi xóa thành công : 1đ

    let btnDel = document.querySelectorAll('.btn-del');
    for (const btn of btnDel) {
        let id = btn.dataset.id;
        btn.addEventListener('click', () => {
            if(confirm('Bạn có chắc muốn xóa không')){
                // alert(id);
                fetch(`${url}/${id}`, {
                    method: 'DELETE',
                }).then(res => res.json()).then(()=>{
                    alert('ban da xoa thanh cong');
                }).catch(err => console.log(err));
            }
        });
    }
// 4. Xây dựng chức năng cập nhật sản phẩm (2 điểm)
// Cập nhật sản phẩm: 1đ
// Hiển thị thông báo sau khi cập nhật: 0.5đ
// Validate form: 0.5đ
    let btnEdit = document.querySelectorAll('.btn-edit');
        for (const btn of btnEdit) {
            let id = btn.dataset.id;
            btn.addEventListener('click', () => {
                // alert(id);
                fetch(`${url}/${id}`).then(res => res.json()).then(data => {
                    content.innerHTML = /*html*/`<form action="">
                    <input type="text" id="pro_name" placeholder="Tên sản phẩm" value="${data.name}">
                    <input type="text"  id="pro_price"  placeholder="Giá sản phẩm" value="${data.price}">
                    <input type="submit" value="Sửa sản Phẩm" class="btn-submit">  
                </form>`;
                  let btnSubmit = document.querySelector('.btn-submit');
                  btnSubmit.addEventListener('click', (e) =>{
                      e.preventDefault();
                      let pro_name = document.querySelector('#pro_name');
                      let pro_price = document.querySelector('#pro_price');
                      if(pro_name.value == ""){
                          alert("Bạn chưa nhập sản phẩm");
                          pro_name.focus();
                          return false;
                      }
                      if(pro_price.value == ""){
                          alert("Bạn chưa nhập giá sản phẩm");
                          pro_name.focus();
                          return false;
                      }
                      const new_pro = {
                         id: id,
                         name: pro_name.value,
                         price: pro_price.value,  
                      }
                      fetch(`${url}/${id}`, {
                          method: 'PUT',
                          headers: {
                              'Content-Type': 'Application/json',       
                          },
                          body: JSON.stringify(new_pro),
                      }).then(res => res.json()).then(() =>{
                              alert("ban da sua san pham thanh cong");
                      }).catch(err => console.log(err));
                  });
                }).catch(err => console.log(err));
           
            });
        }

  }).catch((err) => console.log(err));


//   3. Xây dựng chức năng thêm mới (2 điểm)
// Thêm sản phẩm : 1 đ
// Hiển thị thông báo sau khi thêm : 0.5đ
// Validate form: 0.5đ

let btnAdd = document.querySelector('.btn-add');
let content = document.querySelector('.content');

btnAdd.addEventListener('click', () =>{
    content.innerHTML = /*html*/`<form action="">
        <input type="text" id="pro_name" placeholder="Tên sản phẩm" >
        <input type="text"  id="pro_price"  placeholder="Giá sản phẩm">

        <input type="submit" value="Thêm sản Phẩm" class="btn-submit">  
    </form>
    `;
    let btnSubmit = document.querySelector('.btn-submit');
    btnSubmit.addEventListener('click', (e) =>{
        e.preventDefault();
        let pro_name = document.querySelector('#pro_name');
        let pro_price = document.querySelector('#pro_price');
        if(pro_name.value == ""){
            alert("Bạn chưa nhập sản phẩm");
            pro_name.focus();
            return false;
        }
        if(pro_price.value == ""){
            alert("Bạn chưa nhập giá sản phẩm");
            pro_name.focus();
            return false;
        }
        const new_pro = {
           name: pro_name.value,
           price: pro_price.value,  
        }
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',       
            },
            body: JSON.stringify(new_pro),
        }).then(res => res.json()).then(() =>{
                alert("ban da them san pham thanh cong");
        }).catch(err => console.log(err));
    });
});

// end thêm sản phẩm