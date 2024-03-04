import { useDispatch, useSelector } from "react-redux";
import { ExclamationIcon } from "@heroicons/react/solid";
import { accVerificationSendTokenAction } from "../../../redux/slices/accountVerification/accVerificationSlices";

export default function AccountVerificationAlertWarning() {
  const dispatch = useDispatch();
  return (
    <div className="bg-red-500 border-l-4 border-yellow-400 p-1">
      <div className="flex">
        <div className="flex-shrink-0">
         
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-200">
           
          </p>
        </div>
      </div>
    </div>
  );
}