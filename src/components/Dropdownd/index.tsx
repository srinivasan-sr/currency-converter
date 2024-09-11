import { useState, useRef } from "react";
import { DropdownProps } from "./Dropdown.types";
import {
    useFloating,
    useClick,
    useDismiss,
    useRole,
    useListNavigation,
    useInteractions,
    FloatingFocusManager,
    useTypeahead,
    offset,
    flip,
    size,
    autoUpdate,
    FloatingPortal
  } from "@floating-ui/react";

export const Dropdown = ({list, dropdownInnerClasses, dropdownSelectedClasses, hoverOnItemClasses}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const options = list.map((item) => item.value);
  
    const { refs, floatingStyles, context } = useFloating({
      placement: "bottom-start",
      open: isOpen,
      onOpenChange: setIsOpen,
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        flip({ padding: 10 }),
        size({
          apply({ rects, elements, availableHeight }) {
            Object.assign(elements.floating.style, {
              maxHeight: `${availableHeight}px`,
              minWidth: `${rects.reference.width}px`
            });
          },
          padding: 10
        })
      ]
    });
  
    const listRef = useRef<Array<HTMLElement | null>>([]);
    const listContentRef = useRef(options);
    const isTypingRef = useRef(false);
  
    const click = useClick(context, { event: "mousedown" });
    const dismiss = useDismiss(context);
    const role = useRole(context, { role: "listbox" });
    const listNav = useListNavigation(context, {
      listRef,
      activeIndex,
      selectedIndex,
      onNavigate: setActiveIndex,
      // This is a large list, allow looping.
      loop: true
    });
    const typeahead = useTypeahead(context, {
      listRef: listContentRef,
      activeIndex,
      selectedIndex,
      onMatch: isOpen ? setActiveIndex : setSelectedIndex,
      onTypingChange(isTyping) {
        isTypingRef.current = isTyping;
      }
    });
  
    const {
      getReferenceProps,
      getFloatingProps,
      getItemProps
    } = useInteractions([dismiss, role, listNav, typeahead, click]);
  
    const handleSelect = (index: number) => {
      setSelectedIndex(index);
      console.log(`index = ${options[index]}`);
      setIsOpen(false);
    };
  
    const selectedItemLabel =
      selectedIndex !== null ? options[selectedIndex] : undefined;

   return(<>
    <div
        tabIndex={0}
        ref={refs.setReference}
        aria-labelledby="select-label"
        aria-autocomplete="none"
        className = {dropdownSelectedClasses || `cursor-pointer text-ellipsis w-52`}
        
        {...getReferenceProps()}
      >
        {selectedItemLabel || "Select "}
      </div>
      {isOpen && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              className={dropdownInnerClasses}
              style={{
                ...floatingStyles,
                overflowY: "auto",
                background: "#eee",
                height: 250,
                minWidth: 100,
                borderRadius: 8,
                outline: 0
              }}
              {...getFloatingProps()}
            >
              {options.map((value, i) => (
                <div
                  key={value}
                  ref={(node) => {
                    listRef.current[i] = node;
                  }}
                  role="option"
                  tabIndex={i === activeIndex ? 0 : -1}
                  aria-selected={i === selectedIndex && i === activeIndex}
                  className={i=== activeIndex ? hoverOnItemClasses : ""}

                  {...getItemProps({
                    // Handle pointer select.
                    onClick() {
                      handleSelect(i);
                    },
                    // Handle keyboard select.
                    onKeyDown(event) {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        handleSelect(i);
                      }

                      if (event.key === " " && !isTypingRef.current) {
                        event.preventDefault();
                        handleSelect(i);
                      }
                    }
                  })}
                >
                  {value}
                  <span
                    aria-hidden
                    style={{
                      position: "absolute",
                      right: 10
                    }}
                  >
                    {i === selectedIndex ? " ✓" : ""}
                  </span>
                </div>
              ))}
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
      </>)
};
