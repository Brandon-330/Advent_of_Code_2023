# SOLUTION PART 1

f = File.new('texts/puzzle_11.txt').read.split("\n")

double_cols_idx = (0...f[0].length).to_a
double_rows_idx = []

f.each_with_index do |line, idx|
  double_rows_idx << idx if line == '.' * f[0].length

  line.chars.each_with_index do |char, char_idx|
    if char == '#' && double_cols_idx.include?(char_idx)
      double_cols_idx.delete(char_idx)
    end
  end
end

galaxies_positions_arr = []
f.each_with_index do |line, line_idx|
  line.chars.each_with_index do |char, char_idx|
    galaxies_positions_arr << [line_idx, char_idx] if char == '#'
  end
end

galaxies_size = galaxies_positions_arr.size

total_combinations = []
galaxies_positions_arr.each_with_index do |galaxy_position1, galaxy_position_idx|
  galaxies_positions_arr[galaxy_position_idx + 1..].each do |galaxy_position2|
    total_combinations << [galaxy_position1, galaxy_position2]
  end
end

minimum_steps_each_comb = total_combinations.map do |galaxies_positions|
  start_line, start_char = galaxies_positions[0]
  end_line, end_char = galaxies_positions[1]

  vertical_steps = end_line - start_line
  horizontal_steps = end_char - start_char

  if vertical_steps >= 0
    (start_line..end_line).to_a.each { |idx| vertical_steps += 1 if double_rows_idx.include?(idx) }
  elsif vertical_steps < 0
    (end_line..start_line).to_a.each { |idx| vertical_steps -= 1 if double_rows_idx.include?(idx)}
  end

  if horizontal_steps >= 0
    (start_char..end_char).to_a.each { |idx| horizontal_steps += 1 if double_cols_idx.include?(idx) }
  elsif horizontal_steps < 0
    (end_char..start_char).to_a.each { |idx| horizontal_steps -= 1 if double_cols_idx.include?(idx)}
  end

  (vertical_steps.abs + horizontal_steps.abs)
end

p minimum_steps_each_comb.sum

# SOLUTION PART 2
# f = File.new('puzzle_11.txt').read.split("\n")

# double_cols_idx = (0...f[0].length).to_a
# double_rows_idx = []

# f.each_with_index do |line, idx|
#   double_rows_idx << idx if line == '.' * f[0].length

#   line.chars.each_with_index do |char, char_idx|
#     if char == '#' && double_cols_idx.include?(char_idx)
#       double_cols_idx.delete(char_idx)
#     end
#   end
# end

# galaxies_positions_arr = []
# f.each_with_index do |line, line_idx|
#   line.chars.each_with_index do |char, char_idx|
#     galaxies_positions_arr << [line_idx, char_idx] if char == '#'
#   end
# end

# galaxies_size = galaxies_positions_arr.size

# total_combinations = []
# galaxies_positions_arr.each_with_index do |galaxy_position1, galaxy_position_idx|
#   galaxies_positions_arr[galaxy_position_idx + 1..].each do |galaxy_position2|
#     total_combinations << [galaxy_position1, galaxy_position2]
#   end
# end

# minimum_steps_each_comb = total_combinations.map do |galaxies_positions|
#   start_line, start_char = galaxies_positions[0]
#   end_line, end_char = galaxies_positions[1]

#   vertical_steps = end_line - start_line
#   horizontal_steps = end_char - start_char

#   if vertical_steps >= 0
#     (start_line..end_line).to_a.each { |idx| vertical_steps += 999999 if double_rows_idx.include?(idx) }
#   elsif vertical_steps < 0
#     (end_line..start_line).to_a.each { |idx| vertical_steps -= 999999 if double_rows_idx.include?(idx)}
#   end

#   if horizontal_steps >= 0
#     (start_char..end_char).to_a.each { |idx| horizontal_steps += 999999 if double_cols_idx.include?(idx) }
#   elsif horizontal_steps < 0
#     (end_char..start_char).to_a.each { |idx| horizontal_steps -= 999999 if double_cols_idx.include?(idx)}
#   end

#   (vertical_steps.abs + horizontal_steps.abs)
# end

# p minimum_steps_each_comb.sum