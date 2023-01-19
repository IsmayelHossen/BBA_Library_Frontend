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

import "../../BBA_Library/library.css";
import { Link } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

const BookRequestAccept = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [BooksData, setBooksData] = useState([]);
  const [BookAcceptgRequestData, setBookAcceptgRequestData] = useState([]);
  const [Employee_BookPreviousRecord, setEmployee_BookPreviousRecord] =
    useState([]);
  const [RequestStatus, setRequestStatus] = useState("");
  const [BookCopyOnServiceingRecord, setBookCopyOnServiceingRecord] = useState(
    []
  );
  const [BookIssuedProcess, setBookIssuedProcess] = useState(false);
  const [Otp, setOtp] = useState("");
  const [ConfirmButton, setConfirmButton] = useState(false);
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
  useEffect(() => {
    document.title = "Book Pending Request";

    getAccetBookRequest();
  }, []);

  //getAcceptBookRequest
  const getAccetBookRequest = async () => {
    axios.get(`${BaseUrl}/library/view/getbookAcceptRequest`).then((res) => {
      console.log(res.data.data);
      setDataLoader(false);
      setBookAcceptgRequestData(res.data.data);
    });
  };

  const BookIssued = async (emp_id, id, book_id) => {
    await axios
      .get(`${BaseUrl}/library/view/getBookCopy_onserviceing/${book_id}`)
      .then((res) => {
        console.log(res.data.data);
        setBookCopyOnServiceingRecord(res.data.data);
        console.log(id);
        const result = BookAcceptgRequestData.filter((data) => data.ID == id);
        setUpdateDataFound(result[0]);
        console.log(result[0]);
      });
  };
  //otp checked
  const OtpChecked = async (otp) => {
    setOtp(otp);
    console.log(otp);
    if (otp) {
      await axios.get(`${BaseUrl}/library/view/otpMatch/${otp}`).then((res) => {
        if (res.data.success) {
          console.log("success");
          setConfirmButton(true);
        } else {
          console.log("false");
          setConfirmButton(false);
        }
      });
    }
  };

  const onSubmitUpdate = async (data) => {
    var issue_date = new Date().toLocaleDateString();
    var issue_date_day = issue_date.split("/")[1];
    var issue_date_month = issue_date.split("/")[0];
    var issue_date_year = issue_date.split("/")[2];
    var issue_date1 =
      issue_date_day + "/" + issue_date_month + "/" + issue_date_year;
    console.log(data);
    var realse_date = data.ReleaseDate;

    var realse_day = realse_date.split("-")[2];
    var realse_month = realse_date.split("-")[1];
    var realse_year = realse_date.split("-")[0];
    var realse_date1 = realse_day + "/" + realse_month + "/" + realse_year;

    const ReleaseDateforCompare =
      realse_month + "/" + realse_day + "/" + realse_year;

    const data1 = {
      book_id: UpdateDataFound.BOOK_ID,
      emp_id: UpdateDataFound.EMP_ID,
      issue_date: issue_date1,
      realse_date: realse_date1,
      request_date: UpdateDataFound.REQUEST_DATE,
      old_book_no: data.old_book_no,
    };
    const ReleaseDateforCompare1 = new Date(ReleaseDateforCompare).getTime();
    const issue_date2 = new Date(issue_date).getTime();
    console.log(ReleaseDateforCompare1, issue_date2);
    if (ReleaseDateforCompare1 <= issue_date2) {
      swal("Release date must be greater than today's date", "", "warning");
      console.log(ReleaseDateforCompare1, issue_date2);
    } else {
      setBookIssuedProcess(true);
      const Result = await axios
        .post(`${BaseUrl}/library/create/AcceptbookIssue`, data1)
        .then((response) => {
          if (response.data.success) {
            getAccetBookRequest();
            setBookIssuedProcess(false);
            swal({
              title: "Book Issued Successfully!",
              icon: "success",
              button: "Ok!",
            });
            reset1();
            window.$("#vendor_update").modal("hide");
          } else if (response.data.success1) {
            swal({
              title: "No Book Available!",
              icon: "warning",
              button: "Ok!",
            });
          }
        });
    }
  };

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getAccetBookRequest();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(
          `${BaseUrl}/library/search/BookRequestAccept_admin/${searchby_lowercase}`
        )
        .then((response) => {
          console.log(response.data);
          // console.log(response.data.data);

          setBookAcceptgRequestData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "User",
      dataIndex: "NAME",
    },
    {
      title: "Designation",
      dataIndex: "DESIGNATION",
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
          {data.IMAGE ? (
            <img src={`${BaseUrl}/uploadDoc/${data.IMAGE}`} width="70" />
          ) : (
            <img src={`${BaseUrl}/uploadDoc/book.png`} width="70" />
          )}
        </>
      ),
    },
    {
      title: "Volume & Edition",
      dataIndex: "VOLUME_EDITION",
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
                BookIssued(record.EMP_ID, record.ID, record.BOOK_ID);
              }}
            >
              <i class="fa fa-mail-reply"></i>
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
                <button type="button" class="Button_success float-right">
                  Total Accept:{BookAcceptgRequestData?.length}
                </button>
              </div>
            </div>
            <div class="card-body1">
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
                      style={{ whiteSpace: "normal" }}
                    >
                      <Table
                        className="table-striped"
                        pagination={{
                          total:
                            BookAcceptgRequestData?.length > 0
                              ? BookAcceptgRequestData
                              : 0,
                          showTotal: (total, range) =>
                            `Showing ${range[0]} to ${range[1]} of ${total} entries`,
                          showSizeChanger: true,
                          onShowSizeChange: onShowSizeChange,
                          itemRender: itemRender,
                        }}
                        style={{ overflowX: "auto" }}
                        columns={columns}
                        // bordered
                        dataSource={
                          BookAcceptgRequestData.length > 0
                            ? BookAcceptgRequestData
                            : ""
                        }
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
                        <i className="fa fa-pencil m-r-5" /> Request Book Issue
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

                    <div class="modal-body ">
                      {/* Loadder */}
                      {BookIssuedProcess && (
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

                      <div className="row Product_add form_design">
                        <form onSubmit={handleSubmit1(onSubmitUpdate)}>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span>Employee
                              Name
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Book Title"
                                defaultValue={UpdateDataFound.NAME}
                                {...register1("empoyee_name")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Book Title
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Book Title"
                                defaultValue={UpdateDataFound.TITLE}
                                {...register1("title")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Author
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Author"
                                defaultValue={UpdateDataFound.AUTHOR}
                                {...register1("author")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              <span style={{ color: "red" }}>*</span> Volume &
                              edition
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Volume & Edition"
                                defaultValue={UpdateDataFound.VOLUME_EDITION}
                                {...register1("volume_edition")}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Book Serial Number
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.BOOK_ID}
                                {...register1("serial number")}
                                readOnly
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
                              Select Option
                            </label>
                            <div className="col-sm-8">
                              <select
                                class="form-select form-control bba_documents-form-control"
                                {...register1("old_book_no", {
                                  required: true,
                                })}
                              >
                                <option value="">Select Old Book Number</option>

                                {UpdateDataFound.OLD_BOOK_NO != null &&
                                UpdateDataFound.OLD_BOOK_NO.split(",").length >
                                  1 ? (
                                  UpdateDataFound.OLD_BOOK_NO.split(",").map(
                                    (row) => (
                                      <>
                                        {BookCopyOnServiceingRecord.length >
                                        0 ? (
                                          BookCopyOnServiceingRecord.map(
                                            (row2, index2) => (
                                              <>
                                                {row != row2.OLD_BOOK_NO && (
                                                  <option value={row}>
                                                    {row}
                                                  </option>
                                                )}
                                              </>
                                            )
                                          )
                                        ) : (
                                          <option value={row}>{row}</option>
                                        )}
                                      </>
                                    )
                                  )
                                ) : (
                                  <option value={UpdateDataFound.OLD_BOOK_NO}>
                                    {UpdateDataFound.OLD_BOOK_NO}
                                  </option>
                                )}
                              </select>
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Release Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="date"
                                {...register1("ReleaseDate", {
                                  required: true,
                                })}
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              OTP Number
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="number"
                                {...register1("OTP Number", {
                                  onChange: (e) => OtpChecked(e.target.value),
                                })}
                              />
                            </div>
                          </div>
                          {ConfirmButton && (
                            <>
                              <div className="SubmitFooter">
                                <button type="submit" class="Button_success">
                                  <span>Confirm</span>
                                </button>
                                <button
                                  type="button"
                                  class="Button_Danger1"
                                  data-dismiss="modal"
                                >
                                  <span> Close</span>
                                </button>
                              </div>
                            </>
                          )}
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

export default BookRequestAccept;
