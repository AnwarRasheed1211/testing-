import Link from 'next/link';
import Image from 'next/image';
import React, { useState } from 'react';
import RegisterNavbar from '/components/registerNavbar';
import styles from '../components/home.module.css';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue } from "@nextui-org/react";
import Modal from '../components/modal-reject';

import {columns, rows} from '../DB/data'


const statusColorMap = {
  accpet: "Accepted",
  pending: "pending",
  reject: "rejected",
};


export default function Register() {

  const [isCreateFormVisible, setCreateFormVisible] = useState(false);
  const [selectedWork, setSelectedWork] = useState(null);
  const [selectedContact, setSelectedContact] = useState(null);

  const [isRejectModalOpen, setRejectModalOpen] = useState(false);

  const renderCell = React.useCallback((users, columnKey) => {
    const cellValue = users[columnKey];

    switch (columnKey) {
      case "name":
        return (
          <User
          description={user.email}
          name={cellValue}
          ></User>
        )
      case "status":
        return <div className={styles['work-description']}>{cellValue}</div>;
      case "hour":
        return <div className={styles['work-scholarhour']}>{cellValue}</div>;
      default:
        return cellValue;
    }
  }, []);

  const [works, setWorks] = useState([
    {
      id: 1,
      image: '/workpost.png',
      title: 'Work 1',
      description: 'Work 1 Description',
      details: 'Work 1 Detail',
      qualifications: 'Qualification information 1',
      contacts: 'Contact information 1',
      studentApplied: [
        { info: 'Student Applied 1' },
      ],
      studentProgress: [
        { info: 'Student Progress 1' },
      ],
    },
    {
      id: 2,
      image: '/workpost.png',
      title: 'Work 2',
      description: 'Work 2 Description',
      details: 'Work 2 Detail',
      qualifications: 'Qualification information 2',
      contacts: 'Contact information 2',
      studentApplied: [
        { info: 'Student Applied 2' },
      ],
      studentProgress: [
        { info: 'Student Progress 2' },
      ],
    },
  ]);

  const handleWorkClick = (workId) => {
    const selectedWork = works.find((work) => work.id === workId);
    setSelectedWork(selectedWork);
  };

  const handleCloseClick = () => {
    setSelectedWork(null); // Reset selectedWork when the Close button is clicked
    setCreateFormVisible(false); // Hide create form if it's open
  };

  const handleDelete = (workId) => {
    const updatedWorks = works.filter(work => work.id !== workId);
    setWorks(updatedWorks);
    setSelectedWork(null);
  };

  const toggleCreateForm = () => {
    setCreateFormVisible((prevVisible) => !prevVisible);
  };


  const openRejectModal = () => {
    setRejectModalOpen(true);
  };

  const closeRejectModal = () => {
    setRejectModalOpen(false);
  };

  const handleReject = () => {
    // Perform the rejection logic here
    // For example, you can make an API call to update the work status
    // After rejection, close the modal
    closeRejectModal();
  };


  return (
    <>
      <RegisterNavbar />

      <div className={styles.line} />
      <h1 className={styles['textwork']}>
        WORK
      </h1>
      <div className={styles['home-page']}>
        <div className={styles['works-list']}>
          <div>
            {works.map((work) => (
              <div key={work.id} onClick={() => handleWorkClick(work.id)} className={styles['work-item']} tabIndex="1">
                <img src={work.image}
                  alt={`Image for ${work.title}`}
                  style={{ width: '100px', height: 'auto', borderRadius: '25px' }}
                />
                <div className={styles['work-details']}>
                  <div className={styles['work-title']}>{work.title}</div>
                  <div className={styles['work-description']}>{work.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles['vertical-line']}></div>
        <div className={styles['work-details']}>
          {selectedWork ? (
            <>
              <div className={styles['button-container']}>
                <button className={styles['accept-button']} onClick={toggleCreateForm}>
                  Accept
                </button>
                <button className={styles['reject-button']} onClick={openRejectModal}>
                  Reject
                </button>

                <Modal
                  isOpen={isRejectModalOpen}
                  onClose={closeRejectModal}
                  onConfirm={handleReject}
                />

                <button className={styles['close-button']} onClick={handleCloseClick}>
                  Close
                </button>
              </div>

              <div className={styles['selected-image']}>
                <img src={selectedWork.image} alt={`Image for ${selectedWork.title}`} style={{ width: '100px', height: 'auto', borderRadius: '25px' }} />
              </div>
              <h2>{selectedWork.title}</h2>
              <p>{selectedWork.description}</p>

              <div className={styles['contact-section']}>
                <div className={styles['title-container']}>
                  <h3
                    className={!selectedContact}
                    onClick={() => {
                      setSelectedContact(null);
                    }}
                  >
                    Details
                  </h3>
                </div>

                <div className={styles['details-info']}>
                  <h3>Qualification</h3>
                  <p>{selectedWork.qualifications}</p>
                </div>

                <div className={styles['details-info']}>
                  <h3>Contact</h3>
                  <p>{selectedWork.contacts}</p>
                </div>
              </div>
            </>
           ) : (
            <div className={`${styles['no-works-messageS']} ${selectedWork ? styles['hidden'] : ''}`}>
              <div className={styles['approve-title']}>Approval Status List</div>
            <Table aria-label="Example table with dynamic content" className={styles["custom-table"]}>
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.key}
                    width={
                      column.key === "name"
                        ? "20%"
                        : column.key === "role"
                        ? "100%"
                        : "20%"
                    }
                    className={`${styles["table-column"]} ${styles["table-header"]}`} // Add a class for header styling
                  >
                    {column.label}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows} className={styles["table-body"]}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell
                        width={
                          columnKey === "name"
                            ? "40%"
                            : columnKey === "role"
                            ? "20%"
                            : "20%"
                        }
                        className={styles["table-cell"]}
                      >
                        {getKeyValue(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>

          </div>
          )}

        </div>
      </div>

    </>
  )
}