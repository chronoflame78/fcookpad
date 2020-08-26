import React, { Component } from "react";
import Footer from "../layout/Footer";
import "../../css/About.css";

export default class AboutUs extends React.Component {
  render() {
    return (
      <div>
        <div className="mlem-about container">
          <div class="row team-title">MLEM MLEM TEAM MEMBERS</div>
          <div className="row team-name">
            <div className="member-container col-lg-2 col-sm-12">
              <div className="lil-xuan-container"></div>
              <div className="duong-name text-center">Đỗ Xuân Dương</div>
            </div>
            <div className="member-container col-lg-2 col-sm-12">
              <div className="leo-nguyen-container"></div>
              <div className="nhat-name text-center">Nguyễn Hồng Nhật</div>
            </div>
            <div className="member-container col-lg-2 col-sm-12">
              <div className="test-lead-container"></div>
              <div className="dung-name text-center">Nguyễn Việt Dũng</div>
            </div>
            <div className="member-container col-lg-2 col-sm-12">
              <div className="hieu-bolt-container"></div>
              <div className="hieu-name text-center">Nguyễn Trung Hiếu</div>
            </div>
            <div className="member-container col-lg-2 col-sm-12">
              <div className="longlh-container"></div>
              <div className="long-name text-center">Lê Hoàng Long</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
