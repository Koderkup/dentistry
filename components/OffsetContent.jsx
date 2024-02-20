import React, { useState } from "react";
import { Modal, Row, Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
const OffsetContent = ({list}) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const openModal = (content) => {
    setSelectedContent(content);
    setShowModal(true);
  };
  const closeModal = () => {
    setSelectedContent(null);
    setShowModal(false);
  };

  return (
    <div>
      <Row>
        {list.map((content) => (
          <Col key={content.id} xs={8} md={8} lg={8} className="mx-auto mb-5">
            <Image
              width={100}
              height={120}
              src={content.widgetURL}
              alt={content.type}
              onClick={() => openModal(content)}
              style={{ cursor: "pointer", width: "100%" }}
            />
          </Col>
        ))}
      </Row>
      <hr />
      <Row>
        <Link href={"/create-content"} style={{ textAlign: "center" }}>
          <Image
            width={70}
            height={70}
            alt="plus"
            src={"./assets/plus.svg"}
            style={{ float: "center" }}
          />
        </Link>
      </Row>

      <Modal show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selectedContent && selectedContent.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedContent && (
            <Image
              width={300}
              height={300}
              src={selectedContent.widgetURL}
              alt={selectedContent.type}
              style={{ width: "100%" }}
            />
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default OffsetContent;
