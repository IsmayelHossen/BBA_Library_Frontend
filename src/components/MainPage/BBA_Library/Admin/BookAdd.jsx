import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";

/**
 * for paginationn and data table
 */
import { Table } from "antd";
import "../../antdstyle.css";
import { itemRender, onShowSizeChange } from "../../paginationfunction";
/**
 * for paginationn and data table end
 */
import swal from "sweetalert";
import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

import { useReactToPrint } from "react-to-print";
const BookAdd = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [lastDocId, setlastDocId] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
  const [PublisherData, setPublisherData] = useState([]);
  const [searchLoader, setsearchLoader] = useState();
  const [bookAddLoader, setbookAddLoader] = useState(false);
  useEffect(() => {
    document.title = "BBA LIBRARY ADD FORM";

    getPublisher();
    getCategory();
    getBooks();
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const {
    reset: reset11,
    register: register1,
    handleSubmit: handleSubmit1,
    formState: { errors: errors2 },
  } = useForm();

  //get publisher

  const getPublisher = () => {
    axios.get(`${BaseUrl}/library/view/getpublisher`).then((res) => {
      // console.log(res.data.data);
      setDataLoader(false);
      setPublisherData(res.data.data);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      // console.log(res.data.data);
      setDataLoader(false);
      setCategoryData(res.data.data);
    });
  };
  const getBooks = () => {
    axios.get(`${BaseUrl}/library/view/getbooks`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBooksData(res.data.data);
    });
  };
  // submit for books add
  const onSubmit = async (data) => {
    setbookAddLoader(true);
    if (data.entry_date) {
      var issued_date = data.entry_date;
      var issued_date_day = issued_date.split("-")[2];
      var issued_date_month = issued_date.split("-")[1];
      var issued_date_year = issued_date.split("-")[0];
      var rearrange_issued_date =
        issued_date_day + "/" + issued_date_month + "/" + issued_date_year;
      data.entry_date = rearrange_issued_date;
    }
    data.entry_date = "";

    if (data.image.length > 0) {
      const formData = new FormData();
      formData.append("category_name", data.category_name);
      formData.append("publisher_name", data.publisher_name);
      formData.append("entry_date", data.entry_date);
      formData.append("book_num", data.book_num);
      formData.append("title", data.title);
      formData.append("author", data.author);
      formData.append("volume_edition", data.volume_edition);
      formData.append("publication_date", data.publication_date);
      formData.append("page_number", data.page_number);
      formData.append("cost", data.cost);
      formData.append("source_date", data.source_date);
      formData.append("desk_number", data.desk_number);
      formData.append("desk_floor", data.desk_floor);
      formData.append("book_copy", data.book_copy);
      formData.append("sequence_num", data.sequence_num);
      formData.append("old_book_num", data.old_book_num);
      formData.append("call_no", data.call_no);
      formData.append("remark", data.remark);
      formData.append("image", data.image[0]);
      axios
        .post(`${BaseUrl}/library/create/book_add_withImage`, formData)
        .then((response) => {
          if (response.data.success == true) {
            setbookAddLoader(false);
            console.log(response.data);
            window.$("#exampleModal").modal("hide");
            swal("New Book Added Successfully", "", "success");
            getBooks();
            // reset();
          } else if (response.data.success == "NotUnique") {
            swal(
              ` Book Serial Number ${response.data.bookNum} is already exist`,
              "",
              "error"
            );
            setbookAddLoader(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`${BaseUrl}/library/create/book_add`, data)
        .then((response) => {
          if (response.data.success == true) {
            setbookAddLoader(false);
            console.log(response.data);
            window.$("#exampleModal").modal("hide");
            swal("New Book  Added Successfully", "", "success");
            getBooks();
            // reset();
          } else if (response.data.success == "NotUnique") {
            setbookAddLoader(false);
            swal(
              ` Book Serial Number ${response.data.bookNum} is already exist`,
              "",
              "error"
            );
          } else if (response.data.success == false) {
            setbookAddLoader(false);
            swal(`Please write proper value to add new book`, "", "error");
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //edit books
  const EditPBook = (id) => {
    //set update id
    setUpdateId(id);
    console.log(id);
    reset11();
    const result = BooksData.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };

  const onSubmitUpdate = (data) => {
    console.log(UpdateDataFound, "onupdate");
    console.log(UpdateId, "update id");
    console.log(data);
    if (data.book_num) {
      UpdateDataFound.BOOK_NUM = data.book_num;
    }
    if (data.category_name) {
      UpdateDataFound.CATEGORY_ID = data.category_name;
    }
    if (data.publisher_name) {
      UpdateDataFound.PUBLISHER_ID = data.publisher_name;
    }
    if (data.entry_date) {
      UpdateDataFound.ENTRY_DATE = data.entry_date;
    }
    if (data.title) {
      UpdateDataFound.TITLE = data.title;
    }
    if (data.author) {
      UpdateDataFound.AUTHOR = data.author;
    }
    if (data.volume_edition) {
      UpdateDataFound.VOLUME_EDITION = data.volume_edition;
    }
    if (data.publication_date) {
      UpdateDataFound.PUBLICATION_DATE = data.publication_date;
    }
    if (data.page_number) {
      UpdateDataFound.PAGE_NUMBER = data.page_number;
    }
    if (data.cost) {
      UpdateDataFound.COST = data.cost;
    }
    if (data.source_date) {
      UpdateDataFound.SOURCE_DATE = data.source_date;
    }
    if (data.desk_number) {
      UpdateDataFound.DESK_NUMBER = data.desk_number;
    }
    if (data.desk_floor) {
      UpdateDataFound.DESK_FLOOR = data.desk_floor;
    }
    if (data.book_copy) {
      UpdateDataFound.NUMBER_OF_COPY = data.book_copy;
    }
    if (data.available_copy) {
      UpdateDataFound.AVAILABLE_COPY = data.available_copy;
    }
    if (data.call_no) {
      UpdateDataFound.CALL_NO = data.call_no;
    }
    if (data.remark) {
      UpdateDataFound.REMARK = data.remark;
    }
    if (data.sequence_num) {
      UpdateDataFound.SEQ_NUMBER = data.sequence_num;
    }
    if (data.old_book_num) {
      UpdateDataFound.OLD_BOOK_NO = data.old_book_num;
    }

    if (data.image.length > 0) {
      console.log("hit howar kotha na");
      const formData = new FormData();
      formData.append("CATEGORY_ID", UpdateDataFound.CATEGORY_ID);
      formData.append("PUBLISHER_ID", UpdateDataFound.PUBLISHER_ID);
      formData.append("ENTRY_DATE", UpdateDataFound.ENTRY_DATE);
      formData.append("BOOK_NUM", UpdateDataFound.BOOK_NUM);
      formData.append("TITLE", UpdateDataFound.TITLE);
      formData.append("AUTHOR", UpdateDataFound.AUTHOR);
      formData.append("VOLUME_EDITION", UpdateDataFound.VOLUME_EDITION);
      formData.append("PUBLICATION_DATE", UpdateDataFound.PUBLICATION_DATE);
      formData.append("PAGE_NUMBER", UpdateDataFound.PAGE_NUMBER);
      formData.append("COST", UpdateDataFound.COST);
      formData.append("SOURCE_DATE", UpdateDataFound.SOURCE_DATE);
      formData.append("DESK_NUMBER", UpdateDataFound.DESK_NUMBER);
      formData.append("DESK_FLOOR", UpdateDataFound.DESK_FLOOR);
      formData.append("NUMBER_OF_COPY", UpdateDataFound.NUMBER_OF_COPY);
      formData.append("CALL_NO", UpdateDataFound.CALL_NO);
      formData.append("REMARK", UpdateDataFound.REMARK);
      formData.append("image", data.image[0]);
      formData.append("sequence_num", UpdateDataFound.SEQ_NUMBER);
      formData.append("old_book_num", UpdateDataFound.OLD_BOOK_NO);

      axios
        .put(
          `${BaseUrl}/library/update/Updatebook_withImage/${UpdateId}/${UpdateDataFound.IMAGE}`,
          formData
        )
        .then((response) => {
          if (response.data.success) {
            getBooks();
            swal({
              title: "Updated Successfully!",
              icon: "success",
              button: "Ok!",
            });
            reset11();
            window.$("#vendor_update").modal("hide");
          }
        })

        .catch((error) => {
          console.log(error);
          console.log(data);
        });
    } else {
      console.log(UpdateDataFound, "post data");
      console.log(UpdateId, "post id"); //6
      // console.log(data.book_num); //7
      // console.log("new", data);
      // console.log("old", UpdateDataFound);
      axios
        .put(
          `${BaseUrl}/library/update/bookUpdate/${UpdateId}`,
          (data = { ...UpdateDataFound })
        )
        .then((response) => {
          console.log(response);
          if (response.data.success == true) {
            getBooks();
            swal({
              title: "Updated Successfully!",
              icon: "success",
              button: "Ok!",
            });
            reset11();
            window.$("#vendor_update").modal("hide");
          }
        })
        .catch((error) => {
          console.log(error);
          console.log(data);
        });
    }
  };

  //data delete
  const DeleteBook = (id, imageName) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/library/delete/book/${id}/${imageName}`)
          .then((response) => {
            if (response.data.success) {
              getBooks();
              swal("Successfully Deleted!Thank You", "", "success");
            } else if (response.data.childDataFoundError) {
              swal("Please at first delete child data record", "", "warning");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        swal("Record is not delete!");
      }
    });
  };
  //search
  const SearchData = (e) => {
    //e.preventDefault();
    setsearchdata(e.target.value);
    // const search = e.target.value.replace(/[^\w]/gi, "");
    const search = e.target.value;
    console.log(search);
    setsearchLoader(true);
    if (search == "") {
      getBooks();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/library/search/booksearch/${searchby_lowercase}`)
        .then((response) => {
          console.log(response.data.data);
          setsearchLoader(false);
          setBooksData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "Book Serial Number",
      dataIndex: "BOOK_NUM",
    },
    {
      title: "Book Status",

      render: (data) => (
        <>
          <p style={{ marginBottom: ".1em" }}>
            Number of copy:{data.NUMBER_OF_COPY}
          </p>
          <p style={{ marginBottom: ".1em" }}>
            Available copy:{data.AVAILABLE_COPY}
          </p>
          <p style={{ marginBottom: ".1em" }}>
            Status:
            {data.NUMBER_OF_COPY != data.AVAILABLE_COPY ? (
              <span
                style={{
                  color: "#c11a1a",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                {data.NUMBER_OF_COPY - data.AVAILABLE_COPY}
              </span>
            ) : (
              <span
                style={{
                  color: "rgb(68, 162, 34)",
                  fontWeight: "700",
                  fontSize: "13px",
                }}
              >
                Ok
              </span>
            )}
          </p>
          <p style={{ marginBottom: ".1em" }}>
            Old book number:{data.OLD_BOOK_NO?.replace(/,/g, "  ")}
          </p>
          <p style={{ marginBottom: ".1em" }}>
            Old book Seq:{data.SEQ_NUMBER?.replace(/,/g, "  ")}
          </p>
        </>
      ),
    },

    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
    },
    {
      title: "Title",
      dataIndex: "TITLE",
    },
    {
      title: "Author",
      dataIndex: "AUTHOR",
    },
    {
      title: "Cover Photo",
      render: (data) => (
        <>
          {data.IMAGE ? (
            <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
          ) : (
            <img src={`${BaseUrl}/uploadDoc/book.png`} width="70" />
          )}
        </>
      ),
    },
    {
      title: "Place & Publisher",
      dataIndex: "PUBLISHER_NAME",
    },

    {
      title: "Volume & Edition",
      dataIndex: "VOLUME_EDITION",
    },
    {
      title: "Publication Date",
      dataIndex: "PUBLICATION_DATE",
    },
    {
      title: "Page Number",
      dataIndex: "PAGE_NUMBER",
    },
    {
      title: "Cost",
      dataIndex: "COST",
    },
    {
      title: "Source & Date",
      dataIndex: "SOURCE_DATE",
    },
    {
      title: "Desk Number",
      dataIndex: "DESK_NUMBER",
    },
    {
      title: "Desk Floor",
      dataIndex: "DESK_FLOOR",
    },

    {
      title: "Call No",
      dataIndex: "CALL_NO",
    },
    {
      title: "Entry Date",
      dataIndex: "ENTRY_DATE",
    },

    {
      title: "Remark",
      dataIndex: "REMARK",
    },
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary btn-sm mb-1"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                EditPBook(record.ID);
              }}
            >
              <i
                className="fa fa-pencil"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
            &nbsp; &nbsp; &nbsp;
            <a
              className="btn btn-danger btn-sm"
              onClick={() => {
                DeleteBook(record.ID, record.IMAGE);
              }}
            >
              <i
                className="fa fa-trash-o"
                style={{ fontSize: "20px", color: "white" }}
              />
            </a>
          </div>
        </div>
      ),
    },
  ];
  //GetBooklistFilterData
  const GetBooklistFilterData = (e) => {
    console.log(e.target.value);
    const bookFilterType = e.target.value;
    if (bookFilterType == "") {
      getBooks();
    } else {
      axios
        .get(`${BaseUrl}/library/search/booksearch_by_filter/${bookFilterType}`)
        .then((response) => {
          console.log(response.data);
          setsearchLoader(false);
          setBooksData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  return (
    <>
      <Helmet>
        <title>Dashboard - BBA Library </title>
        <meta name="description" content="BBA STORE" />
      </Helmet>
      {/* Header */}
      <div className="page-wrapper">
        {/* Page Content */}
        <div className="content container-fluid">
          {/* Page Header */}
          <div class="">
            <div class="card-header1">
              <div className="">
                <h4
                  className="text-center mx-auto mb-3 text-uppercase fddd"
                  id="hddd"
                >
                  BBA Library
                </h4>
              </div>
              {/* header */}

              <div className="row">
                <div class="col-md-8 mb-2">
                  <div class="row">
                    <div class="col-md-6 mb-2">
                      <div className="row">
                        <label for="inputtext" class="col-sm-3 col-form-label">
                          {" "}
                          <button class="btn btn-default"> Filter:</button>
                        </label>
                        <div className="col-sm-9">
                          <select
                            class=" form-select form-control bba_documents-form-control"
                            name="select_type_toPrint"
                            onChange={GetBooklistFilterData}
                          >
                            <option value="">Select Type</option>

                            {CategoryData &&
                              CategoryData.map((row) => (
                                <option value={`${row.CATEGORY_NAME}`}>
                                  {row.CATEGORY_NAME}
                                </option>
                              ))}

                            {PublisherData &&
                              PublisherData.map((row) => (
                                <option value={`${row.PUBLISHER_NAME}`}>
                                  {row.PUBLISHER_NAME}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div
                        class="form-group has-search"
                        style={{ marginBottom: "0px" }}
                      >
                        <span class="fa fa-search form-control-feedback"></span>
                        <input
                          type="text"
                          class="form-control bba_documents-form-control"
                          value={searchdata}
                          name="searchStatus"
                          placeholder="Search"
                          onChange={(e) => SearchData(e)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div class="col-md-4">
                  <button
                    type="button"
                    class="Button_success float-right"
                    data-toggle="modal"
                    data-target="#exampleModal"
                  >
                    <i class="fa fa-plus"></i> <span>Add Book</span>
                  </button>
                </div>
              </div>
            </div>

            <div class="card-body1">
              {/* /Page Header */}
              <div
                class="modal custom-modal fade "
                id="exampleModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                {/* ADD DOCUMENT START */}

                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h5 style={{ color: "rgba(17, 123, 108, 0.85)" }}>
                        <i class="fa fa-plus"></i> Add Book
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}

                        <div class="col-md-12">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            class="form_design"
                          >
                            <div className="mb-1 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Category
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class=" form-select form-control bba_documents-form-control"
                                  {...register("category_name", {
                                    required: true,
                                  })}
                                >
                                  <option value="">Select Category</option>
                                  {CategoryData &&
                                    CategoryData.map((row, index) => (
                                      <option value={row.ID}>
                                        {row.CATEGORY_NAME}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                            <div className="mb-1 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Place & Publisher
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class=" form-select form-control bba_documents-form-control"
                                  {...register("publisher_name", {
                                    required: true,
                                  })}
                                >
                                  <option value="">Select Publisher</option>
                                  {PublisherData &&
                                    PublisherData.map((row, index) => (
                                      <option value={row.ID}>
                                        {row.PUBLISHER_NAME}
                                      </option>
                                    ))}
                                </select>
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                Book Entry Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Entry Date"
                                  // defaultValue={nextDocId}
                                  {...register("entry_date", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>

                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Book Serial Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Book Serial Number"
                                  {...register("book_num", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Book Title
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Book title"
                                  // defaultValue={nextDocId}
                                  {...register("title", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                Book Covor Photo
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="file"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Book title"
                                  {...register("image", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Author
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Author"
                                  {...register("author", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Volume & Edition
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Volume & Edition"
                                  {...register("volume_edition", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Publication Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Publication date"
                                  // defaultValue={nextDocId}
                                  {...register("publication_date", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                <span style={{ color: "red" }}>*</span> Page
                                Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Page Number"
                                  {...register("page_number", {
                                    required: true,
                                    valueAsNumber: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Cost
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Cost "
                                  // defaultValue={nextDocId}
                                  {...register("cost", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Source & Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="source & Date"
                                  // defaultValue={nextDocId}
                                  {...register("source_date", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Desk number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Desk Number"
                                  // defaultValue={nextDocId}
                                  {...register("desk_number", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Desk Floor
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Desk floor"
                                  // defaultValue={nextDocId}
                                  {...register("desk_floor", {
                                    required: true,
                                    valueAsNumber: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Number of Book Copy
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Number of book copy"
                                  // defaultValue={nextDocId}
                                  {...register("book_copy", {
                                    required: true,
                                    valueAsNumber: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                Sequence Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder=" Sequence Number"
                                  {...register("sequence_num", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                <span style={{ color: "red" }}>*</span>
                                Old Book Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder=" Old Book Number"
                                  {...register("old_book_num", {
                                    required: true,
                                  })}
                                />
                              </div>
                            </div>
                            <div className="mb-1  row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                Call No
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Call No"
                                  {...register("call_no", {
                                    required: false,
                                    valueAsNumber: true,
                                  })}
                                />
                                {errors.call_no && (
                                  <span>This filed must be number</span>
                                )}
                              </div>
                            </div>
                            <div className="mb-1 row">
                              <label
                                for="inputtext"
                                class="col-sm-4 col-form-label"
                              >
                                {" "}
                                <span style={{ color: "red" }}>*</span>
                                Remark
                              </label>
                              <div className="col-sm-8">
                                <select
                                  class=" form-select form-control bba_documents-form-control"
                                  {...register("remark", {
                                    required: true,
                                  })}
                                >
                                  <option value="">
                                    Select Book Condition
                                  </option>
                                  <option value="পুরাতন বই">পুরাতন বই</option>
                                  <option value="নতুন বই">নতুন বই</option>
                                </select>
                              </div>
                            </div>

                            {bookAddLoader && (
                              <div
                                class="spinner-border text-primary ml-2 mt-1 mb-1"
                                role="status"
                              >
                                <span class="sr-only">Loading...</span>
                              </div>
                            )}
                            <div className="SubmitFooter">
                              <button
                                type="submitupdate"
                                class="Button_success"
                              >
                                <span>Add</span>
                              </button>

                              <button
                                type="button"
                                class="Button_Danger1"
                                data-dismiss="modal"
                              >
                                <span> Close</span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*ADD DOCUMENT END*/}

              {/* table start */}
              <div className="row">
                <div className="col-md-12">
                  {DataLoader && (
                    <>
                      <div class="row">
                        <div class="col-md-5"></div>
                        <div class="col-md-2 mt-4">
                          <ColorRing
                            visible={true}
                            height="80"
                            width={100}
                            ariaLabel="blocks-loading"
                            wrapperStyle={{}}
                            wrapperClass="blocks-wrapper"
                            colors={[
                              "#e15b64",
                              "#f47e60",
                              "#f8b26a",
                              "#abbd81",
                              "#849b87",
                            ]}
                          />
                        </div>
                        <div class="col-md-5"></div>
                      </div>
                    </>
                  )}
                  {!DataLoader && (
                    <div
                      className="table-responsive vendor_table_box"
                      // style={{ whiteSpace: "normal" }}
                    >
                      <Table
                        className="table-striped"
                        pagination={{
                          total: BooksData?.length > 0 ? BooksData : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={BooksData.length > 0 ? BooksData : ""}
                        rowKey={(record) => record.id}
                        onChange={console.log("chnage")}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* update vendor modal start */}

              <div
                class="modal custom-modal fade "
                id="vendor_update"
                tabindex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-lg" role="document">
                  <div class="modal-content modal-content_docs">
                    <div class="modal-header">
                      <h6
                        class="modal-title"
                        id="exampleModalLabel"
                        style={{
                          fontWeight: "600",
                          color: "#5265ac",
                          fontSize: "15px",
                        }}
                      >
                        <i className="fa fa-pencil m-r-5" /> Update Book
                        {/*UpdateDataFound.id*/}
                      </h6>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>

                    {/* publisher update form */}
                    <div class="modal-body ">
                      <div className="row Product_add">
                        {/* vendor form */}
                        {UpdateDataFound && (
                          <>
                            <form
                              onSubmit={handleSubmit1(onSubmitUpdate)}
                              class="form_design"
                            >
                              <div
                                className="mb-1 row"
                                style={{ display: "none" }}
                              >
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>id
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Id"
                                    defaultValue={UpdateDataFound?.BOOK_NUM}
                                    {...register1("id")}
                                  />
                                </div>
                              </div>
                              <div className="mb-1 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Category
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    class=" form-select form-control bba_documents-form-control"
                                    {...register1("category_name", {
                                      required: false,
                                    })}
                                  >
                                    <option
                                      value={`${UpdateDataFound.CATEGORY_ID}`}
                                    >
                                      {UpdateDataFound.CATEGORY_NAME}
                                    </option>
                                    {CategoryData &&
                                      CategoryData.map((row, index) => (
                                        <>
                                          {row.ID !=
                                            UpdateDataFound.CATEGORY_ID && (
                                            <option value={row.ID}>
                                              {row.CATEGORY_NAME}
                                            </option>
                                          )}
                                        </>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="mb-1 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Place & Publisher
                                </label>
                                <div className="col-sm-8">
                                  <select
                                    class=" form-select form-control bba_documents-form-control"
                                    {...register1("publisher_name", {
                                      required: false,
                                    })}
                                  >
                                    <option
                                      value={`${UpdateDataFound.PUBLISHER_ID}`}
                                    >
                                      {UpdateDataFound.PUBLISHER_NAME}
                                    </option>
                                    {PublisherData &&
                                      PublisherData.map((row1, index) => (
                                        <>
                                          {row1.ID !=
                                            UpdateDataFound.PUBLISHER_ID && (
                                            <option value={row1.ID}>
                                              {row1.PUBLISHER_NAME}
                                            </option>
                                          )}
                                        </>
                                      ))}
                                  </select>
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  Book Entry Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Entry Date"
                                    defaultValue={UpdateDataFound?.ENTRY_DATE}
                                    {...register1("entry_date", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>

                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Book Serial Number
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Book Serial Number"
                                    defaultValue={UpdateDataFound?.BOOK_NUM}
                                    {...register1("book_num", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Book Title
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Book title"
                                    defaultValue={UpdateDataFound.TITLE}
                                    {...register1("title", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  {UpdateDataFound.IMAGE ? (
                                    <img
                                      src={`${BaseUrl}/uploadDoc/${UpdateDataFound.IMAGE}`}
                                      width="40"
                                    />
                                  ) : (
                                    ""
                                  )}
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="file"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Book title"
                                    {...register1("image", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Author
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="author"
                                    defaultValue={UpdateDataFound.AUTHOR}
                                    {...register1("author", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Volume & Edition
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Volume & Edition"
                                    defaultValue={
                                      UpdateDataFound.VOLUME_EDITION
                                    }
                                    {...register1("volume_edition", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Publication Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Publication date"
                                    defaultValue={
                                      UpdateDataFound.PUBLICATION_DATE
                                    }
                                    {...register1("publication_date", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Page Number
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Page Number"
                                    defaultValue={UpdateDataFound.PAGE_NUMBER}
                                    {...register1("page_number", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Cost
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Cost "
                                    defaultValue={UpdateDataFound.COST}
                                    {...register1("cost", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Source & Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="source & Date"
                                    defaultValue={UpdateDataFound.SOURCE_DATE}
                                    {...register1("source_date", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Desk number
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Desk Number"
                                    defaultValue={UpdateDataFound.DESK_NUMBER}
                                    {...register1("desk_number", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Desk Floor
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Desk floor"
                                    defaultValue={UpdateDataFound.DESK_FLOOR}
                                    {...register1("desk_floor", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Number of Book Copy
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Number of book copy"
                                    defaultValue={
                                      UpdateDataFound.NUMBER_OF_COPY
                                    }
                                    {...register1("book_copy", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>
                                  Available Copy
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Number of book available"
                                    defaultValue={
                                      UpdateDataFound.AVAILABLE_COPY
                                    }
                                    {...register1("available_copy", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  Sequence Number
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Book Serial Number"
                                    defaultValue={UpdateDataFound?.SEQ_NUMBER}
                                    {...register1("sequence_num", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  Old Book Number
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Old Book Number"
                                    defaultValue={UpdateDataFound?.OLD_BOOK_NO}
                                    {...register1("old_book_num", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>

                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Call No
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="number"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Call No"
                                    defaultValue={UpdateDataFound.CALL_NO}
                                    {...register1("call_no", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>
                              <div className="mb-1  row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  Remark
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Write Remark"
                                    defaultValue={UpdateDataFound.REMARK}
                                    {...register1("remark", {
                                      required: false,
                                    })}
                                  />
                                </div>
                              </div>

                              <div className="SubmitFooter">
                                <button type="submit" class="Button_success">
                                  <span>Update</span>
                                </button>
                                <button
                                  type="button"
                                  class="Button_Danger1"
                                  data-dismiss="modal"
                                >
                                  <span> Close</span>
                                </button>
                              </div>
                            </form>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* update vendor modal end  */}
        </div>
        {/* /Page Content */}
      </div>
    </>
  );
};

export default BookAdd;
