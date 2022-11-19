import axios from "axios";
import React, { useEffect, useState } from "react";
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
// import Dashboard from "../MainPage/Main/Dashboard";

const BookAdd = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [PublisherData, setPublisherData] = useState([]);
  const [lastDocId, setlastDocId] = useState("");
  const [CategoryData, setCategoryData] = useState([]);
  const [BooksData, setBooksData] = useState([]);
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
    reset: reset1,
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
            getBooks();
            reset();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  //edit publisher

  const EditPublisher = (id) => {
    console.log(Alldata);
    //set update id
    setUpdateId(id);

    const result = PublisherData.filter((data) => data.ID == id);
    setUpdateDataFound(result[0]);
    console.log(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    if (data.id == "") {
      data.id = UpdateDataFound.ID;
    }
    if (data.publisher_name == "") {
      data.publisher_name = UpdateDataFound.PUBLISHER_NAME;
    }

    const updateResult = await axios
      .put(`${BaseUrl}/library/update/publisher/${data.id}`, data)
      .then((response) => {
        if (response.data.success) {
          getPublisher();
          swal({
            title: "Updated Successfully!",
            icon: "success",
            button: "Ok!",
          });
          reset1();
          window.$("#vendor_update").modal("hide");
        }
      })

      .catch((error) => {
        console.log(error);
        console.log(data);
      });

    // console.log(UpdateDataFound);
  };

  //data delete
  const DeletePublisher = (id) => {
    swal({
      title: "Are you sure want to delete?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(async (result) => {
      if (result) {
        const abc = await axios
          .delete(`${BaseUrl}/library/delete/publisher/${id}`)
          .then((response) => {
            if (response.data.success) {
              getPublisher();
              swal("Successfully Deleted!Thank You", "", "success");
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
      title: "Covor Photo",
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
            <p style={{ color: "red" }}>
              {record.NUMBER_OF_COPY - record.AVAILABLE_COPY} book on service
            </p>
          ) : (
            <span style={{ color: "green" }}>Ok</span>
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
                EditPublisher(record.ID);
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
                DeletePublisher(record.ID);
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
              <div className="d-flex justify-content-between align-items-center Page_header_title_search">
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
                                      <option value={row.CATEGORY_NAME}>
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
                                      <option value={row.PUBLISHER_NAME}>
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
                        dataSource={BooksData ? BooksData : ""}
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
                        <i className="fa fa-pencil m-r-5" /> Update Publisher
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
                        <form
                          onSubmit={handleSubmit1(onSubmitUpdate)}
                          class="form_design"
                        >
                          <div className="mb-1 row" style={{ display: "none" }}>
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
                                defaultValue={UpdateDataFound?.ID}
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
                              <span style={{ color: "red" }}>*</span> document
                              id
                            </label>
                            <div className="col-sm-8">
                              <input
                                type="text"
                                class="form-control bba_documents-form-control"
                                placeholder="Publisher name"
                                defaultValue={UpdateDataFound?.PUBLISHER_NAME}
                                {...register1("publisher_name")}
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