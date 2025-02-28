import clsx from "clsx";
import MultiRangeSlider from "multi-range-slider-react";
import { useState } from "react";
import { Checkbox, CheckboxField } from "./catalyst/checkbox";
import { Field, Fieldset } from "./catalyst/fieldset";
const MultiRange = ({
  color = "green",
  reading,
  measure = "mmHg",
  min = 0,
  max = 100,
}) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);
  const [isInverted, setIsInverted] = useState(false);

  const handleMinMax = (e) => {
    setMinValue(e.minValue);
    setMaxValue(e.maxValue);
  };

  const colors = {
    green: {
      class: `[&_.caption_*]:!bg-primary-green_3 ${isInverted ? "[&_.bar-left]:!bg-primary-green_3 [&_.bar-right]:!bg-primary-green_3 [&_.thumb]:after:bg-primary-gray_9" : "[&_.thumb]:after:bg-primary-green_3"}`,
      hex: "#4CC2CB",
    },
    red: {
      class: `[&_.caption_*]:!bg-primary-red_2 ${isInverted ? "[&_.bar-left]:!bg-primary-red_2 [&_.bar-right]:!bg-primary-red_2 [&_.thumb]:after:bg-primary-gray_9" : "[&_.thumb]:after:bg-primary-red_2"}`,
      hex: "#C21A88",
    },
  };

  const currentColor = colors[color];

  return (
    <Fieldset className="!mt-6">
      <div className="mb-3 text-[21px] font-medium leading-[14px] text-black">
        {reading}
      </div>
      <div className="text-primary-dark_1 mt-3 text-[21px] leading-7">
        {minValue} - {maxValue}
      </div>
      <div className="flex items-start justify-between">
        <Field className="w-[70%]">
          <MultiRangeSlider
            min={min}
            max={max}
            step={1}
            minValue={0}
            labels={[`${min} ${measure}`, `${max} ${measure}`]}
            maxValue={100}
            ruler={false}
            className={clsx(
              //base
              "[&_.label]:!text-primary-gray_8 !border-none !shadow-none [&_.bar-left]:!p-0 [&_.bar]:h-1 [&_.label]:!w-max [&_.labels]:!m-[15px_-10px_-22px_-10px]",
              // Inner styles
              "[&_.thumb-left]:before:!mx-[-5px] [&_.thumb]:before:!my-[-5px] [&_.thumb]:before:!h-[15px] [&_.thumb]:before:!w-[15px] [&_.thumb]:before:!border-none [&_.thumb]:before:!shadow-none",
              // Outter styles
              `[&_.thumb]:after:content [&_.thumb]:after [&_.thumb-left]:after:mx-[-13px] [&_.thumb-right]:after:mx-[-19px] [&_.thumb]:after:absolute [&_.thumb]:after:my-[-13px] [&_.thumb]:after:h-[30px] [&_.thumb]:after:w-[30px] [&_.thumb]:after:rounded-[50%] ${!isInverted && "[&_.thumb]:after:opacity-20"}`,
              // Bar
              "[&_.bar-inner]:!border-none [&_.bar-inner]:!shadow-none [&_.bar-left]:!border-none [&_.bar-left]:!bg-primary-gray_5 [&_.bar-left]:!shadow-none [&_.bar-right]:!border-none [&_.bar-right]:!bg-primary-gray_5 [&_.bar-right]:!shadow-none",
              // Caption
              "[&_.caption_*]:!shadow-none",
              currentColor.class,
            )}
            thumbRightColor={isInverted ? "#EDEDF3" : currentColor.hex}
            thumbLeftColor={isInverted ? "#EDEDF3" : currentColor.hex}
            barInnerColor={isInverted ? "#EDEDF3" : currentColor.hex}
            onInput={handleMinMax}
          />
        </Field>
        <CheckboxField>
          <Checkbox
            onChange={() => {
              console.log("infw");
              setIsInverted(!isInverted);
            }}
          />
        </CheckboxField>
      </div>
    </Fieldset>
  );
};

export default MultiRange;
