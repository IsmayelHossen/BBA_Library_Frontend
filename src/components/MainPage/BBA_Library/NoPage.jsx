import React from "react";

const NoPage = () => {
  return (
    <>
      <div className="page-wrapper">
        <h3>404</h3>
      </div>
    </>
  );
};

export default NoPage;

// create table bookrent(
//     id int not NULL primary key,
//     book_id int not null,
//     emp_id int not null,
//     issue_date varchar2(20),
//     release_date varchar2(20),
//     receive_date varchar2(20) null,
//     fine varchar2(200) null,
//     status int not null,
//     foreign key(book_id) references books(book_num),
//     foreign key(emp_id) references employees(id)
//     );
