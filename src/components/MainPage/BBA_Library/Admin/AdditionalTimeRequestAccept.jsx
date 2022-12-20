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
import { Link, useParams } from "react-router-dom";
import { BaseUrl } from "../CommonUrl";
import { ColorRing, LineWave, Rings } from "react-loader-spinner";

const AdditionalTimeRequestAccept = () => {
  const [DataLoader, setDataLoader] = useState(true);
  const [searchdata, setsearchdata] = useState("");
  const [UpdateDataFound, setUpdateDataFound] = useState({});
  const [vendorDeleteId, setvendorDeleteId] = useState("");
  const [Alldata, setdata] = useState([]);
  const [UpdateId, setUpdateId] = useState();
  const [AdditionalTimeRequestSingleData, setAdditionalTimeRequestSingleData] =
    useState([]);
  const [AdditionalTimeRequestStatus, setAdditionalTimeRequestStatus] =
    useState("");
  const params = useParams();
  const params2 = useParams();
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

    getAdditionalTimeRequestSingleData();
  }, []);

  //getAccetBookRequest
  const getAdditionalTimeRequestSingleData = async () => {
    const bookrent_id = params.bookrent_id;
    axios
      .get(
        `${BaseUrl}/library/view/getAdditionalTimeRequestSingle/${bookrent_id}`
      )
      .then((res) => {
        console.log(res.data.data);
        setDataLoader(false);

        setAdditionalTimeRequestSingleData(res.data.data);
      });
  };

  //edit publisher

  const AdditionalTimeRequestEdit = async (id, bookrent_id) => {
    console.log(id, bookrent_id);
    const result = AdditionalTimeRequestSingleData.filter(
      (data) => data.ID_3 == id
    );
    setUpdateDataFound(result[0]);
  };
  const onSubmitUpdate = async (data) => {
    // var receive_date = data.ReceiveDate;
    // var receive_day = receive_date.split("-")[2];
    // var receive_month = receive_date.split("-")[1];
    // var receive_year = receive_date.split("-")[0];
    // var receive_date1 = receive_day + "/" + receive_month + "/" + receive_year;
    const data1 = {
      id: UpdateDataFound.ID_3,
      previous_release_date: UpdateDataFound.PRE_RELEASE_DATE,
      new_release_date: UpdateDataFound.NEW_RELEASE_DATE,
      bookrent_id: UpdateDataFound.BOOKRENT_ID,
      request_status: data.request_status,
      dclined: data.remark,
    };

    //  console.log(data);
    const Result = await axios
      .put(`${BaseUrl}/library/update/IssuebookRenew/${data1.id}`, data1)
      .then((response) => {
        if (response.data.success) {
          getAdditionalTimeRequestSingleData();
          swal({
            title: "Issued Book Renew Successfully!",
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
                <button type="button" class="Button_success float-right">
                  Renew Request Approval
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
                    <>
                      <div className="table-responsive ">
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>User</th>

                              <th>Book Serial Number</th>
                              <th>Old Book Number</th>
                              <th>Title</th>
                              <th>Cover Photo</th>
                              <th>Category</th>
                              <th>Place & Publisher</th>
                              <th>Issued Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {AdditionalTimeRequestSingleData &&
                              AdditionalTimeRequestSingleData.slice(0, 1).map(
                                (row, index) => (
                                  <tr>
                                    <td>
                                      {row.NAME}({row.DESIGNATION})
                                    </td>

                                    <td>{row.BOOK_NUM}</td>
                                    <td>{row.OLD_BOOK_NO_1}</td>
                                    <td>{row.TITLE}</td>
                                    <td>
                                      <img
                                        src={`${BaseUrl}/uploadDoc/${row.IMAGE}`}
                                        width="60"
                                      />
                                    </td>
                                    <td>{row.CATEGORY_NAME}</td>
                                    <td>{row.PUBLISHER_NAME}</td>
                                    <td>{row.ISSUE_DATE}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                      <div class="table-responsive mt-4">
                        <h5 class="text-center">Renew History</h5>
                        <table class="table table-striped">
                          <thead>
                            <tr>
                              <th>Sent Requeste Date</th>
                              <th>Previous Release Date</th>
                              <th>Requested New Release Date</th>
                              <th>Status</th>
                              <th>Action</th>
                              <th>Remark </th>
                            </tr>
                          </thead>
                          <tbody>
                            {AdditionalTimeRequestSingleData &&
                              AdditionalTimeRequestSingleData.map(
                                (row, index) => (
                                  <tr>
                                    <td>{row.REQUEST_DATE}</td>
                                    <td>{row.PRE_RELEASE_DATE}</td>
                                    <td>{row.NEW_RELEASE_DATE}</td>
                                    <td>
                                      {row.STATUS_1 == 0
                                        ? "Pending"
                                        : row.STATUS_1 == 1
                                        ? "Accept"
                                        : "Declined"}
                                    </td>
                                    <td>
                                      {row.STATUS_1 == 0 ? (
                                        <a
                                          className="btn btn-primary btn-sm"
                                          href="#"
                                          data-toggle="modal"
                                          data-target="#vendor_update"
                                          onClick={() => {
                                            AdditionalTimeRequestEdit(
                                              row.ID_3,
                                              row.BOOKRENT_ID
                                            );
                                          }}
                                        >
                                          <i
                                            className="fa fa-pencil"
                                            style={{
                                              fontSize: "20px",
                                              color: "white",
                                            }}
                                          />
                                        </a>
                                      ) : row.STATUS_1 == 1 ? (
                                        <button className="btn btn-success btn-sm">
                                          <i
                                            className="fa fa-check"
                                            style={{
                                              fontSize: "20px",
                                              color: "white",
                                            }}
                                          />
                                        </button>
                                      ) : (
                                        <button className="btn btn-danger btn-sm">
                                          <i
                                            style={{
                                              fontSize: "20px",
                                              color: "white",
                                            }}
                                            class="fa fa-times"
                                            aria-hidden="true"
                                          ></i>
                                        </button>
                                      )}
                                    </td>
                                    <td>{row.REMARK3}</td>
                                  </tr>
                                )
                              )}
                          </tbody>
                        </table>
                      </div>
                    </>
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
                        Renew Request Approval
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
                              Requested Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Requested Date"
                                defaultValue={UpdateDataFound.REQUEST_DATE}
                                {...register1("requested_date")}
                                readOnly
                              />
                            </div>
                          </div>
                          <div className="mb-1 row">
                            <label
                              for="inputtext"
                              class="col-sm-4 col-form-label"
                            >
                              Previous Release Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                placeholder="Previous Release Date"
                                defaultValue={UpdateDataFound.PRE_RELEASE_DATE}
                                {...register1("pre_release_date")}
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
                              New Release Date
                            </label>
                            <div className="col-sm-8">
                              <input
                                class="form-control bba_documents-form-control"
                                type="text"
                                defaultValue={UpdateDataFound.NEW_RELEASE_DATE}
                                {...register1("new_release_date")}
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
                                {...register1("request_status", {
                                  onChange: (e) =>
                                    setAdditionalTimeRequestStatus(
                                      e.target.value
                                    ),
                                })}
                              >
                                <option value="">Select decision</option>
                                <option value="1">Accept</option>
                                <option value="2">Declined</option>
                              </select>
                            </div>
                          </div>
                          {AdditionalTimeRequestStatus == 2 && (
                            <>
                              <div className="mb-1 row">
                                <label
                                  for="inputtext"
                                  class="col-sm-4 col-form-label"
                                >
                                  {" "}
                                  <span style={{ color: "red" }}>*</span>{" "}
                                  Declined Cause
                                </label>
                                <div className="col-sm-8">
                                  <textarea
                                    class="form-control bba_documents-form-control"
                                    {...register1("remark")}
                                  ></textarea>
                                </div>
                              </div>
                            </>
                          )}
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

export default AdditionalTimeRequestAccept;
