import { Dialog, Transition } from '@headlessui/react';
import Chart from 'react-apexcharts';
import { Fragment, useState } from 'react';
import '../../assets/css/tailwind.css';


const Modal = ({ open, title,size,onClose, children }) => {
  const closeModal = () => {
    onClose(!open)
  };


  document.addEventListener("keyup",(e)=>{
    if(e.code === "Escape"){
      closeModal();
    }
  })

  let three = {
    series: [
      {
        name: 'خودرو و ساخت قطعات',
        data: [
          {
            x: 'خودرد',
            y: "-3.83%"
          },
          {
            x: 'خساپا',
            y: "-3.97%"
          },
          {
            x: 'خسگتر',
            y: "1.67%"
          }
        ]
      },
      {
        name: 'استخراج کانه های فلزی',
        data: [
          {
            x: 'تجلی',
            y: "2.6%"
          },
          {
            x: 'کاما',
            y: "2.9%"
          },
          {
            x: 'ومعادن',
            y: "1.78%"
          }
        ]
      },
      {
        name: 'فلزات اساسی',
        data: [
          {
            x: "فملی",
            y: "1.2%"
          },
          {
            x: 'فولاد',
            y: "-1.16%"
          },
          {
            x: 'میدکو',
            y: "0%"
          }
        ]
      },
      {
        name: 'فلزات اساسی',
        data: [
          {
            x: "فملی",
            y: "1.2%"
          },
          {
            x: 'فولاد',
            y: "-1.16%"
          },
          {
            x: 'میدکو',
            y: "0%"
          }
        ]
      },
    ],
    options: {
      legend: {
        show: false
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'نقشه بازار',
        align: 'center'
      },
      dataLabels: {
        enabled: true,
        style: {
          fontSize: '12px',
        },
        formatter: function(text, op) {
          return [text, op.value]
        },
        offsetY: -4
      },
      plotOptions: {
        treemap: {
          enableShades: true,
          shadeIntensity: 0.5,
          reverseNegativeShade: true,
          colorScale: {
            ranges: [
              {
                from: -6,
                to: 0,
                color: '#E91E63'
              },
              {
                from: 0.001,
                to: 3,
                color: '#66DA26'
              }
            ]
          }
        }
      }
    },
  }

  const classes = [
    "modal",
    open ? "" : "hidden",
  ].join(" ");

  const contentClasses = [
    "modal-content",
    size ? `modal-${size}` : "modal-md",
  ].join(" ")
  return (
    <div className={classes}>
      <div className="modal-wrapper" onClick={(e)=> e.target.className === "modal-wrapper" ? closeModal() : null}>
        <div className={contentClasses} >
          <div className={`modal-header ${title ? "" : "justify-end border-none pb-0"}`}>
            <h3 className="modal-title">{title}</h3>
            <button type="button" className="close-modal" onClick={closeModal}>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div className={`modal-body ${title === undefined ? "no-padding" : ""}`}>
            <Chart 
              height={350}
              options={three.options}
              series={three.series}
              type="treemap"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
