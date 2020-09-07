import React, { Component } from "react";
import Footer from "../layout/Footer";
import "../../css/About.css";

export default class AboutUs extends React.Component {
  render() {
    return (
      <div className="outside-container">
        <div className="mlem-about container">
          <div className="capstone-title text-center">
            MLEM MLEM - Cooking Recipe Sharing Network
          </div>
          <div className="row sup-title-container text-center">
            <div className="row col-lg-6 col-md-12 col-sm-12 sup text-center">
              <div className="sup-image col-lg-4 col-md-12 col-sm-12 text-center"></div>
              <div className="sup-name col-lg-6 col-md-8 col-sm-8 text-center">
                <div>
                  <b>Supervisor</b>
                </div>
                <div>Nguyễn Văn Hiển</div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 team-title text-center col-sm-12">Team Members</div>
          </div>
          <div className="row member-container">
            <div className="col-lg-2 text-center col-sm-8">
              <div className="dung"></div>
              <div>
                Leader
                <br />
                Nguyễn Việt Dũng
                <br />
                SE05581
              </div>
            </div>
            <div className="col-lg-2 text-center col-sm-8">
              <div className="hieu"></div>
              <div>
                Member
                <br />
                Nguyễn Trung Hiếu
                <br />
                SE05878
              </div>
            </div>
            <div className="col-lg-2 text-center col-sm-8">
              <div className="duong"></div>
              <div>
                Member
                <br />
                Đỗ Xuân Dương 
                <br />
                SE05811
              </div>
            </div>
            <div className="col-lg-2 text-center col-sm-8">
              <div className="long"></div>
              <div>
                Member
                <br />
                Lê Hoàng Long
                <br />
                SE048994
              </div>
            </div>
            <div className="col-lg-2 text-center col-sm-8">
              <div className="nhat"></div>
              <div>
                Leader
                <br />
                Nguyễn Hồng Nhật
                <br />
                SE05539
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
