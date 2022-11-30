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
import "../../../index.css";
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

  useEffect(() => {
    document.title = "DOCUMENTS ADD FORM";

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
      console.log(res.data.data);
      setDataLoader(false);
      setPublisherData(res.data.data);
    });
  };
  const getCategory = () => {
    axios.get(`${BaseUrl}/library/view/getcategory`).then((res) => {
      console.log(res.data.data);
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
  // submit for add publisher
  const onSubmit = (data) => {
    var issued_date = data.entry_date;
    var issued_date_day = issued_date.split("-")[2];
    var issued_date_month = issued_date.split("-")[1];
    var issued_date_year = issued_date.split("-")[0];
    var rearrange_issued_date =
      issued_date_day + "/" + issued_date_month + "/" + issued_date_year;
    data.entry_date = rearrange_issued_date;

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
      formData.append("call_no", data.call_no);
      formData.append("remark", data.remark);
      formData.append("image", data.image[0]);
      axios
        .post(`${BaseUrl}/library/create/book_add_withImage`, formData)
        .then((response) => {
          if (response) {
            console.log(response.data.data);
            window.$("#exampleModal").modal("hide");
            swal("New Book Issued Successfully", "", "success");
            getBooks();
            reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios
        .post(`${BaseUrl}/library/create/book_add`, data)
        .then((response) => {
          if (response) {
            console.log(response.data.data);
            window.$("#exampleModal").modal("hide");
            swal("New Book Issued Successfully", "", "success");
            getBooks();
            reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  // useEffect(() => {
  //   console.log(UpdateId);
  //   axios
  //     .get(`${BaseUrl}/library/view/getbookDataforUpdate/${UpdateId}`)
  //     .then((res) => {
  //       console.log(res.data.data);
  //       setDataLoader(false);
  //       setUpdateDataFound(res.data.data[0]);
  //     });
  // }, [UpdateId]);
  //edit publisher
  const EditPBook = async (book_num) => {
    console.log(book_num);
    //set update id
    setUpdateId(book_num);
    reset11();

    const result = await BooksData.filter((data) => data.BOOK_NUM == book_num);

    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    console.log(data);
    if (data.book_num == "") {
      data.book_num = UpdateDataFound.BOOK_NUM;
      console.log(data.book_num);
    }
    if (data.category_name == "") {
      data.category_name = UpdateDataFound.CATEGORY_ID;
      console.log(data.category_name);
    }
    if (data.publisher_name == "") {
      data.publisher_name = UpdateDataFound.PUBLISHER_ID;
      console.log(data.publisher_name);
    }
    if (data.entry_date == "") {
      data.entry_date = UpdateDataFound.ENTRY_DATE;
    }
    if (data.book_num == "") {
      data.book_num = UpdateDataFound.BOOK_NUM;
    }
    if (data.title == "") {
      data.title = UpdateDataFound.TITLE;
    }
    if (data.author == "") {
      data.author = UpdateDataFound.AUTHOR;
    }
    if (data.volume_edition == "") {
      data.volume_edition = UpdateDataFound.VOLUME_EDITION;
    }
    if (data.publication_date == "") {
      data.publication_date = UpdateDataFound.PUBLICATION_DATE;
    }
    if (data.page_number == "") {
      data.page_number = UpdateDataFound.PAGE_NUMBER;
    }
    if (data.cost == "") {
      data.cost = UpdateDataFound.COST;
    }
    if (data.source_date == "") {
      data.source_date = UpdateDataFound.SOURCE_DATE;
    }
    if (data.desk_number == "") {
      data.desk_number = UpdateDataFound.DESK_NUMBER;
    }
    if (data.desk_floor == "") {
      data.desk_floor = UpdateDataFound.DESK_FLOOR;
    }
    if (data.book_copy == "") {
      data.book_copy = UpdateDataFound.NUMBER_OF_COPY;
    }
    if (data.available_copy == "") {
      data.available_copy = UpdateDataFound.AVAILABLE_COPY;
    }
    if (data.call_no == "") {
      data.call_no = UpdateDataFound.CALL_NO;
    }
    if (data.remark == "") {
      data.remark = UpdateDataFound.REMARK;
    }

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
      formData.append("call_no", data.call_no);
      formData.append("remark", data.remark);
      formData.append("image", data.image[0]);
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
      console.log(UpdateId); //6
      console.log(data.book_num); //7
      console.log(data);
      console.log(UpdateDataFound);

      axios
        .put(`${BaseUrl}/library/update/bookUpdate/${UpdateId}`, data)
        .then((response) => {
          console.log(response);
          if (response.data.success == true) {
            getBooks();
            swal({
              title: "Updated Successfully4444!",
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
  const DeleteBook = (bookNum, imageName) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/library/delete/book/${bookNum}/${imageName}`)
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
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    setsearchLoader(true);
    if (search == "") {
      getBooks();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(`${BaseUrl}/library/search/booksearch/${searchby_lowercase}`)
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

  //table
  const columns = [
    {
      title: "Action",
      render: (text, record) => (
        <div className="">
          <div className="">
            <a
              className="btn btn-primary btn-sm"
              href="#"
              data-toggle="modal"
              data-target="#vendor_update"
              onClick={() => {
                EditPBook(record.BOOK_NUM);
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
              href="#"
              onClick={() => {
                DeleteBook(record.BOOK_NUM, record.IMAGE);
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
    {
      title: "Book Serial Number",
      dataIndex: "BOOK_NUM",
    },
    {
      title: "Category Name",
      dataIndex: "CATEGORY_NAME",
    },
    {
      title: "Place & Publisher",
      dataIndex: "PUBLISHER_NAME",
    },
    {
      title: "Issued Date",
      dataIndex: "ENTRY_DATE",
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
          <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
        </>
      ),
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
      title: "Number of book copy",
      dataIndex: "NUMBER_OF_COPY",
    },
    {
      title: "Available copy",
      dataIndex: "AVAILABLE_COPY",
    },
    {
      title: "Book Status",
      render: (text, record) => (
        <div className="">
          {record.NUMBER_OF_COPY != record.AVAILABLE_COPY ? (
            <p
              style={{ color: "#c11a1a", fontWeight: "700", fontSize: "18px" }}
            >
              {record.NUMBER_OF_COPY - record.AVAILABLE_COPY} copy service on
              going
            </p>
          ) : (
            <span
              style={{
                color: "rgb(68, 162, 34)",
                fontWeight: "700",
                fontSize: "15px",
              }}
            >
              Ok
            </span>
          )}
        </div>
      ),
    },

    {
      title: "Call No",
      dataIndex: "CALL_NO",
    },
    {
      title: "Remark",
      dataIndex: "REMARK",
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
                                <span style={{ color: "red" }}>*</span>
                                Book Issued Date
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="date"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Entry Date"
                                  // defaultValue={nextDocId}
                                  {...register("entry_date", {
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
                                Book Serial Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="text"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Book Serial Number"
                                  // defaultValue={nextDocId}
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
                                  placeholder="author"
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
                                Page Number
                              </label>
                              <div className="col-sm-8">
                                <input
                                  type="number"
                                  class="form-control bba_documents-form-control"
                                  placeholder="Page Number"
                                  {...register("page_number", {
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
                                  // defaultValue={nextDocId}
                                  {...register("remark", {
                                    required: false,
                                  })}
                                />
                              </div>
                            </div>

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
                    <div className="table-responsive vendor_table_box">
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
                                    <option value="">Select Category</option>
                                    {CategoryData &&
                                      CategoryData.map((row, index) => (
                                        <>
                                          {row.ID ==
                                          UpdateDataFound?.CATEGORY_ID ? (
                                            <option
                                              value={
                                                UpdateDataFound?.CATEGORY_ID
                                              }
                                              selected
                                            >
                                              {row?.CATEGORY_NAME}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                          {row.ID !=
                                          UpdateDataFound?.CATEGORY_ID ? (
                                            <option
                                              value={
                                                UpdateDataFound?.CATEGORY_ID
                                              }
                                            >
                                              {row?.CATEGORY_NAME}
                                            </option>
                                          ) : (
                                            ""
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
                                    {PublisherData &&
                                      PublisherData.map((row, index) => (
                                        <>
                                          {row.ID ==
                                          UpdateDataFound?.PUBLISHER_ID ? (
                                            <option
                                              value={
                                                UpdateDataFound?.PUBLISHER_ID
                                              }
                                              selected
                                            >
                                              {row?.PUBLISHER_NAME}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                          {row.ID !=
                                          UpdateDataFound?.PUBLISHER_ID ? (
                                            <option
                                              defaultValue={`"
                                                ${UpdateDataFound?.PUBLISHER_ID}"`}
                                              selected
                                            >
                                              {row.PUBLISHER_NAME}
                                            </option>
                                          ) : (
                                            ""
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
                                  <span style={{ color: "red" }}>*</span>
                                  Book Issued Date
                                </label>
                                <div className="col-sm-8">
                                  <input
                                    type="text"
                                    class="form-control bba_documents-form-control"
                                    placeholder="Entry Date"
                                    defaultValue={UpdateDataFound?.ENTRY_DATE}
                                    // defaultValue={nextDocId}
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
                                  <img
                                    src={`${BaseUrl}/uploadDoc/${UpdateDataFound.IMAGE}`}
                                    width="40"
                                  />
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
                                    type="number"
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
