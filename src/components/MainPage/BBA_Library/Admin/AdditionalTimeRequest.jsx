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

const AdditionalTimeRequest = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();

  const [BooksData, setBooksData] = useState([]);
  const [BookARentStatusData, setBookARentStatusData] = useState([]);
  const [Employee_BookPreviousRecord, setEmployee_BookPreviousRecord] =
    useState([]);
  const [RequestStatus, setRequestStatus] = useState("");
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
    document.title = "Book Rent Status";

    getAdditionalTimeRequestData();
  }, []);

  //getAccetBookRequest
  const getAdditionalTimeRequestData = async () => {
    axios
      .get(`${BaseUrl}/library/view/getAdditionalTimeRequestAll`)
      .then((res) => {
        console.log(res.data.data);
        setDataLoader(false);
        const unique = [
          ...new Map(res.data.data.map((m) => [m.BOOKRENT_ID, m])).values(),
        ];

        setBookARentStatusData(unique);
      });
  };

  //edit publisher

  const ReturnBookssued = async (emp_id, book_id) => {
    console.log(emp_id, book_id);
    const result = BookARentStatusData.filter(
      (data) => data.EMP_ID == emp_id && data.BOOK_ID == book_id
    );
    setUpdateDataFound(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    var receive_date = data.ReceiveDate;
    var receive_day = receive_date.split("-")[2];
    var receive_month = receive_date.split("-")[1];
    var receive_year = receive_date.split("-")[0];
    var receive_date1 = receive_day + "/" + receive_month + "/" + receive_year;
    const data1 = {
      book_id: UpdateDataFound.BOOK_ID,
      emp_id: UpdateDataFound.EMP_ID,
      issue_date: UpdateDataFound.ISSUE_DATE,
      receive_date: receive_date1,
      remark: data.remark,
    };
    const Result = await axios
      .put(
        `${BaseUrl}/library/update/IssuebookReturn/${UpdateDataFound.EMP_ID}`,
        data1
      )
      .then((response) => {
        if (response.data.success) {
          getAdditionalTimeRequestData();
          swal({
            title: "Issued Book Received Successfully!",
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

    console.log(UpdateDataFound);
  };

  //search
  const SearchData = (e) => {
    console.log(e.target.value);
    //e.preventDefault();
    setsearchdata(e.target.value);
    const search = e.target.value;
    if (search == "") {
      getAdditionalTimeRequestData();
    } else {
      const searchby_lowercase = search.toLowerCase();
      axios
        .get(
          `${BaseUrl}/library/search/bookrentStatus_admin/${searchby_lowercase}`
        )
        .then((res) => {
          //console.log(response.data);
          // console.log(response.data.data);
          setBookARentStatusData(res.data.data);
          //setPublisherData(response.data.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  //table
  const columns = [
    {
      title: "User Name",
      dataIndex: "NAME",
    },
    {
      title: "User Email",
      dataIndex: "EMAIL",
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
      title: "Number of Copy",
      dataIndex: "NUMBER_OF_COPY",
    },
    {
      title: "Available Copy",
      dataIndex: "AVAILABLE_COPY",
    },

    {
      title: "Issued Date",
      dataIndex: "ISSUE_DATE",
    },

    {
      title: "View",
      render: (text, record) => (
        <div className="">
          <Link
            to={`/admin/renew/single/view/${record.BOOKRENT_ID}`}
            className="btn btn-primary btn-sm"
          >
            {" "}
            <i
              className="fa fa-eye"
              style={{ fontSize: "20px", color: "white" }}
            />
          </Link>
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
                  Renew Status
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
                    <div className="table-responsive vendor_table_box">
                      <Table
                        className="table-striped"
                        pagination={{
                          total:
                            BookARentStatusData?.length > 0
                              ? BookARentStatusData
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
                          BookARentStatusData ? BookARentStatusData : ""
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
                        <i className="fa fa-pencil m-r-5" />
                        Issued book receive
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

                    <div class="modal-body ">
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
                              Status
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.STATUS}
                                {...register1("status")}
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
                              Receiving Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="date"
                                {...register1("ReceiveDate")}
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              {" "}
                              Remark
                            </label>
                            <div className="col-sm-8">
                              <textarea
                                class="form-control bba_documents-form-control"
                                type="text"
                                {...register1("remark")}
                              ></textarea>
                            </div>
                          </div>
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

export default AdditionalTimeRequest;
