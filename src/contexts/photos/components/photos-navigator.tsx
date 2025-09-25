import cx from "classnames";
import { ButtonIcon, Skeleton } from "@/components";
import ArrowLeftIcon from "@/assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "@/assets/icons/chevron-right.svg?react";
import { useNavigate } from "react-router";

interface PhotosNavigatorProps extends React.ComponentProps<"div"> {
  previousPhotoid?: string;
  nextPhotoId?: string;
  loading?: boolean;
}

export function PhotosNavigator({
  previousPhotoid,
  nextPhotoId,
  loading,
  className,
  ...props
}: PhotosNavigatorProps) {
  const navigate = useNavigate()
  return (
    <div className={cx("flex gap-2", className)} {...props}>
      {!loading ? (
        <div>
          <div className="flex gap-3">
            <ButtonIcon
              icon={ArrowLeftIcon}
              variant="secondary"
              disabled={!previousPhotoid}
              onClick={() => navigate(`/photos/${previousPhotoid}`)}
            />
            <ButtonIcon
              icon={ArrowRightIcon}
              variant="secondary"
              disabled={!nextPhotoId}
              onClick={() => navigate(`/photos/${nextPhotoId}`)}
            />
          </div>
        </div>
      ) : (
        <>
          <Skeleton className="w-10 h-10" />
          <Skeleton className="w-20 h-10" />
        </>
      )}
    </div>
  );
}
