def valid_mirror?(arr1, arr2)
  return false if arr1.empty? || arr2.empty?
  arr1 = arr1.reverse
  min_size = [arr1.size, arr2.size].min
  arr1[0, min_size] == arr2[0, min_size]
end

def row_split_at(row, idx)
  [row[0...idx], row[idx..]]
end

def return_row_mirror_idx(pattern, previous_line_idx=nil)
  all_possible_mirrors_idx = Array.new(pattern[0].size) { |idx| idx }
  
  pattern.each do |row|
    all_possible_combinations = []
    rejectable_idxs = []

    all_possible_mirrors_idx.each do |idx|
      left, right = row_split_at(row, idx)
      rejectable_idxs << idx unless valid_mirror?(left, right)
    end

    rejectable_idxs.each do |idx|
      all_possible_mirrors_idx.delete(idx)
    end
  end

  all_possible_mirrors_idx.reject { |num| num == previous_line_idx }[0]
end

def return_column_mirror_idx(pattern, previous_col_idx=nil)
  all_possible_mirrors_idx = Array.new(pattern.size) { |idx| idx }

  all_possible_mirrors_idx.select! do |idx|
    top, bottom = column_split_at(pattern, idx)
    valid_mirror?(top, bottom)
  end

  all_possible_mirrors_idx.reject { |num| num == previous_col_idx }[0]
end

def column_split_at(pattern, idx)
  [pattern[0...idx], pattern[idx..]]
end

patterns = File.new('texts/puzzle_13.txt').read.split("\n\n")
patterns.map! { |pattern| pattern.split("\n") }

total = 0
patterns.each do |pattern|
  left_size = return_row_mirror_idx(pattern)
  top_row_size = return_column_mirror_idx(pattern)

  idx = 0
  loop do
    new_pattern = pattern
    line_idx = idx / pattern[0].size
    char_idx = idx % pattern[0].size

    if char_idx == 0 && line_idx > 0
      if new_pattern[line_idx - 1][(pattern[0].size - 1)] == '#'
        new_pattern[line_idx - 1][(pattern[0].size - 1)] = '.'
      elsif new_pattern[line_idx - 1][(pattern[0].size - 1)] == '.'
        new_pattern[line_idx - 1][(pattern[0].size - 1)] = '#'
      end
    elsif char_idx > 0
      if new_pattern[line_idx][char_idx - 1] == '#'
        new_pattern[line_idx][char_idx - 1] = '.'
      elsif new_pattern[line_idx][char_idx - 1] == '.'
        new_pattern[line_idx][char_idx - 1] = '#'
      end
    end

    if new_pattern[line_idx][char_idx] == '.'
      new_pattern[line_idx][char_idx] = '#' 
    elsif new_pattern[line_idx][char_idx] == '#'
      new_pattern[line_idx][char_idx] = '.'
    end

    # if line_idx == 13 && char_idx == 2 || line_idx == 13 && char_idx == 3
    #   p new_pattern
    # end

    new_left_size = return_row_mirror_idx(new_pattern, left_size)
    new_top_row_size = return_column_mirror_idx(new_pattern, top_row_size)

    if new_left_size && new_left_size != left_size
      total += new_left_size
      break
    elsif new_top_row_size && new_top_row_size != top_row_size
      total += (new_top_row_size * 100)
      break
    end

    idx += 1
  end
end

p total

# SOLUTION PART 1

# def valid_mirror?(arr1, arr2)
#   return false if arr1.empty? || arr2.empty?
#   arr1 = arr1.reverse
#   min_size = [arr1.size, arr2.size].min
#   arr1[0, min_size] == arr2[0, min_size]
# end

# def row_split_at(row, idx)
#   [row[0...idx], row[idx..]]
# end

# def return_row_mirror_idx(pattern)
#   all_possible_mirrors_idx = Array.new(pattern[0].size) { |idx| idx }
  
#   pattern.each do |row|
#     all_possible_combinations = []
#     rejectable_idxs = []

#     all_possible_mirrors_idx.each do |idx|
#       left, right = row_split_at(row, idx)
#       rejectable_idxs << idx unless valid_mirror?(left, right)
#     end

#     rejectable_idxs.each do |idx|
#       all_possible_mirrors_idx.delete(idx)
#     end
#   end

#   all_possible_mirrors_idx[0]
# end

# def return_column_mirror_idx(pattern)
#   all_possible_mirrors_idx = Array.new(pattern.size) { |idx| idx }

#   all_possible_mirrors_idx.select! do |idx|
#     top, bottom = column_split_at(pattern, idx)
#     valid_mirror?(top, bottom)
#   end

#   all_possible_mirrors_idx[0]
# end

# def column_split_at(pattern, idx)
#   [pattern[0...idx], pattern[idx..]]
# end

# patterns = File.new('texts/puzzle_13.txt').read.split("\n\n")
# patterns.map! { |pattern| pattern.split("\n") }

# total = 0
# patterns.each do |pattern|
#   left_size = return_row_mirror_idx(pattern)
#   top_row_size = return_column_mirror_idx(pattern)

#   total += left_size if left_size
#   total += (top_row_size * 100) if top_row_size
# end

# puts total