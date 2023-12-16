strings_arr = File.new('texts/puzzle_15.txt').read.split(',')

def HASHMAP(label)
  box_num = 0
  label.each_char do |char|
    box_num += char.ord
    box_num *= 17
    box_num %= 256
  end

  box_num
end

boxes = Hash.new
while !strings_arr.empty?
  iterating_seq = strings_arr.shift
  if iterating_seq.include?('=')
    label, focal_length = iterating_seq.split('=')
    box_num = HASHMAP(label)
    boxes[box_num] = [] unless boxes[box_num]
    if boxes[box_num].empty? || !boxes[box_num].any? { |label_and_focal_arr| label_and_focal_arr[0] == label }
      boxes[box_num] << [label, focal_length.to_i]
    else
      boxes[box_num].each { |label_and_focal_arr| label_and_focal_arr[1] = focal_length.to_i if label_and_focal_arr[0] == label }
    end
  elsif iterating_seq.include?('-')
    label, focal_length = iterating_seq.split('-')
    box_num = HASHMAP(label)
    if boxes[box_num] && !boxes[box_num].empty?
      boxes[box_num].reject! { |label_and_focal_arr| label_and_focal_arr[0] == label }
    end
  end

  boxes.reject! { |_, arr| arr.empty? }
end

total = 0
boxes.each do |box_num, arr|
  slot_num = 1
  arr.each do |label_and_focal_arr|
    total += ((box_num + 1) * slot_num * label_and_focal_arr[1])
    slot_num += 1
  end
end

p total


# SOLUTION PART 1

# strings_arr = File.new('texts/puzzle_15.txt').read.split(",")

# p (strings_arr.map do |string|
#   current_val = 0
#   string.each_char do |char|
#     current_val += char.ord
#     current_val *= 17
#     current_val %= 256
#   end

#   current_val
# end.sum)
