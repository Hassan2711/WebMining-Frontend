import React from "react";
import "../../app/globals.css"; // We'll create this CSS file for styling
import { Eye, SquarePen } from "lucide-react";
import { Modal, ModalTrigger, ModalBody, ModalContent } from "./animated-modal";
import { Label } from "./label";
import { Input } from "./input";
import { BottomGradient, LabelInputContainer } from "./Login";
import Pagination from "@/components/ui/Pagination";

const TableDemo = ({ data }) => {
  return (
    <div className="table-container">
      <div className="table-header"></div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Business Name</th>
            <th>Type</th>
            <th>Receive Date</th>
            <th>Status</th>
            <th>Checked By</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>
                <div className="business-info">
                  <div className="yp-logo">yp</div>
                  <div>
                    <div>{item.businessName}</div>
                    <div className="address">{item.address}</div>
                  </div>
                </div>
              </td>
              <td>{item.type}</td>
              <td>{item.receiveDate}</td>
              <td>
                <span className={`status ${item.status.toLowerCase()}`}>
                  {item.status}
                </span>
              </td>
              <td>
                <div className="checked-by">
                  <span className="initials">{item.checkedBy.initials}</span>
                  <span>{item.checkedBy.name}</span>
                </div>
              </td>
              <td>
                <button className="more-options">
                  <Modal>
                    <ModalTrigger className="">
                      <SquarePen />
                    </ModalTrigger>
                    <ModalBody>
                      <ModalContent>
                        <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8">
                          Edit Here
                        </h4>
                        <div>
                          <div>
                            <p>
                              Email:
                            </p>
                            <p>test@gmail.com</p>
                          </div>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="Name">Business Name</Label>
                            <Input
                              id="name"
                              placeholder="Alpha LLC"
                              type="name"
                            />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="Name">Business Name</Label>
                            <Input
                              id="name"
                              placeholder="Alpha LLC"
                              type="name"
                            />
                          </LabelInputContainer>
                          <LabelInputContainer className="mb-4">
                            <Label htmlFor="Name">Business Name</Label>
                            <Input
                              id="name"
                              placeholder="Alpha LLC"
                              type="name"
                            />
                          </LabelInputContainer>
                        </div>
                        <button
                          className="bg-gradient-to-br relative group/btn from-primaryColor dark:from-primaryColor dark:to-primaryColor to-neutral-600 block dark:bg-primaryColor w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--primaryColor)_inset,0px_-1px_0px_0px_var(--primaryColor)_inset]"
                          type="submit"
                        >
                          Add &rarr;
                          <BottomGradient />
                        </button>
                      </ModalContent>
                    </ModalBody>
                  </Modal>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center py-6 mx-auto items-center">
        <Pagination />
      </div>
    </div>
  );
};

export default TableDemo;
