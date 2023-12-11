f = File.new('puzzle_3.txt')
f = f.readlines
f = f.map do |line|
  line.gsub("\n", '')
end

def determine_str(line, starting_idx)
  length = 2
  str = line[starting_idx]
  while line[starting_idx, length].to_i.to_s == line[starting_idx, length] && starting_idx + length <= line.length
    str = line[starting_idx, length]
    length += 1
  end

  str
end

line_hash_nums = {}
symbol_idx = []
special_symbol_idx = []
line_idx = 0
f.each do |line|
  iter_nums_idx = []
  iter_symbol_idx = []
  iter_special_symbol_idx = []
  idx = 0
  while idx < line.size
    char = line[idx]
    if char == '.'
      idx += 1
      next
    elsif /[0-9]/.match?(char)
      str = determine_str(line, idx)
      iter_nums_idx << [str, (idx..(idx + str.length - 1)).to_a]
      idx += str.length
    elsif /[^0-9.*]/.match?(char)
      iter_symbol_idx << idx
      idx += 1
    elsif /[*]/.match?(char)
      iter_special_symbol_idx << idx
      idx += 1
    end
  end

  line_hash_nums[line_idx] = iter_nums_idx
  line_idx += 1
  symbol_idx << iter_symbol_idx
  special_symbol_idx << iter_special_symbol_idx
end

total = 0



line_idx = 0
nums_arr = []
acceptable_arr = []
while line_idx < f.size
  if line_idx == 0
    nums_arr = line_hash_nums[line_idx] + line_hash_nums[line_idx + 1]
  elsif line_idx == f.size - 1
    nums_arr = line_hash_nums[line_idx - 1] + line_hash_nums[line_idx]
  else
    nums_arr = line_hash_nums[line_idx - 1] + line_hash_nums[line_idx] + line_hash_nums[line_idx + 1]
  end

  special_symbol_idx[line_idx].each do |idx|
    short_arr = []
    counter = nums_arr.count do |str_and_indices_arr|
      str, indices_arr = str_and_indices_arr
      if idx == 0
        short_arr << str.to_i if indices_arr.include?(idx) || indices_arr.include?(idx + 1)
        indices_arr.include?(idx) || indices_arr.include?(idx + 1)
      elsif idx == f[0].size - 1
        short_arr << str.to_i if indices_arr.include?(idx - 1) || indices_arr.include?(idx)
        indices_arr.include?(idx - 1) || indices_arr.include?(idx)
      else
        short_arr << str.to_i if indices_arr.include?(idx - 1) || indices_arr.include?(idx) || indices_arr.include?(idx + 1)
        indices_arr.include?(idx - 1) || indices_arr.include?(idx) || indices_arr.include?(idx + 1)
      end
    end

    total += short_arr.inject(1) { |sum, num| sum * num } if counter == 2
  end

  line_idx += 1
end

puts total